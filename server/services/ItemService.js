
import {CollectionModel} from "../models/models.js";
import {ItemModel as itemModel} from "../models/models.js";
import {UserModel} from "../models/models.js";
import {CommentModel} from "../models/models.js";
import {LikeModel} from "../models/models.js";
import {ApiError} from "../error/ApiError.js";
import {TagItems} from "../models/models.js";
import {TagModel} from "../models/models.js";

class ItemService {

    async createItem ( dto ) {
        const item = await itemModel.create( dto )
        // const itemTag = TagItems.create({itemId: 47, tagId: 4})
        return item
    }


    async getItems ( filter, sort, limit = 10 ) {
        const collectionId = filter.collectionId
        let where = {}

        let query = {limit, include: [CollectionModel, UserModel, {model: LikeModel, as: 'likes'} ]}
        if (sort) query = {...query, order: [[sort, 'DESC']]}
        if (collectionId) where = {collectionId}
        if (where) query = {...query, where: where }
        return await itemModel.findAndCountAll( query )

    }

    async getItem ( id ) {
        const item = await itemModel.findOne({
            where: {id},
            include:[
                // CommentModel,
                {model: TagModel, as: 'tags'}
                // {model: LikeModel, as: 'likes'}
            ]

        })
        if (!item) throw ApiError.badRequest(
            `Item id: ${id} do not exist`,
            `Item id - ${id} do not exist`)
        return item
    }

    async deleteItem ( id ) {
        const item = await itemModel.findByPk( id )
        if ( !item ) return new Error('')
        return await item.destroy()
    }

    async updateItem ( dto ) {
        const item = await itemModel.findByPk( dto.id )
    }

}


export const itemService = new ItemService()