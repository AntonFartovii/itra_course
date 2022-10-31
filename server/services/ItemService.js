
import {CollectionModel} from "../models/models.js";
import {ItemModel} from "../models/models.js";
import {UserModel} from "../models/models.js";
import {CommentModel} from "../models/models.js";
import {LikeModel} from "../models/models.js";
import {ApiError} from "../error/ApiError.js";
import {TagModel} from "../models/models.js";
import {TagItems} from "../models/models.js";


class ItemService {

    async createItem ( dto ) {
        const item = await ItemModel.create( dto )
        return item
    }

    async tag( itemId, tagName ) {

        let item = await this.getItem( itemId )

        let tag = await TagModel.findOne({where: {name: tagName}})
        if (!tag) tag = await TagModel.create({name: tagName})

        const ref = await TagItems.findOne({
            where: {
                itemId, tagId: tag.id
            }
        })

        if (ref) {
            await ref.destroy()
        } else {
            await item.addTag( tag )
        }
        item = await this.getItem( itemId )
        return item.tags

    }

    async getItems ( filter, sort, limit = 10 ) {
        const collectionId = filter.collectionId
        let where = {}

        let query = {limit, include: [
            CollectionModel,
            UserModel,
            {model: TagModel, as: 'tags'},
            {model: LikeModel, as: 'likes'}
            ]}
        if (sort) query = {...query, order: [[sort, 'DESC']]}
        if (collectionId) where = {collectionId}
        if (where) query = {...query, where: where }
        return await ItemModel.findAndCountAll( query )

    }

    async getItem ( id ) {
        const item = await ItemModel.findOne({
            where: {id},
            include:[
                CommentModel,
                {model: TagModel, as: 'tags'},
                {model: LikeModel, as: 'likes'}
            ]
        })

        if (!item) throw ApiError.badRequest(
            `Item id: ${id} do not exist`,
            `Item id - ${id} do not exist`)
        return item
    }

    async deleteItem ( id ) {
        const item = await ItemModel.findByPk( id )
        if ( !item ) return new Error('')
        return await item.destroy()
    }

    async updateItem ( dto ) {
        const item = await ItemModel.findByPk( dto.id )
    }

}


export const itemService = new ItemService()