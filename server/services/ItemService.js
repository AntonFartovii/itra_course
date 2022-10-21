
import {CollectionModel} from "../models/models.js";
import {ItemModel as itemModel} from "../models/models.js";
import {UserModel} from "../models/models.js";

class ItemService {

    async createItem ( dto ) {
        const item = await itemModel.create( dto )
        return item
    }

    async getItems ( filter, sort, limit = 10 ) {
        const collectionId = filter.collectionId
        let where = {}

        let query = {limit, include: [CollectionModel, UserModel]}
        if (sort) query = {...query, order: [[sort, 'DESC']]}
        if (collectionId) where = {collectionId}
        if (where) query = {...query, where: where }
        console.log(query)
        return await itemModel.findAndCountAll( query )

    }

    async getItem ( id ) {
        const item = await itemModel.findByPk( id )
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