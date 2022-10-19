import {ItemModel as itemModel} from "../models/models.js";

class ItemService {

    async createItem ( dto ) {
        const item = await itemModel.create( dto )
        return item
    }

    async getItems ( userId = null, collectionId =  null, limit = 10 ) {

        console.log(userId, collectionId, limit)
        const items = async (collectionId, limit) => {
            if ( !collectionId ) return await itemModel.findAndCountAll({limit})
            return await itemModel.findAndCountAll({where: {collectionId}, limit})
        }

        return items( collectionId, limit )
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