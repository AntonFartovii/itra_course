import {itemService} from "../services/ItemService.js";


class ItemController {

    async createItem (req, res, next) {
        try {
            const {name, collectionId, userId} = req.body
            const data = await itemService.createItem( {name, collectionId, userId}  )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getItems (req, res, next) {
        try {
            let {userId, collectionId, sort, limit} = req.query
            const filter = {userId, collectionId}
            const data = await itemService.getItems( filter, sort, limit)
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getItem (req, res, next) {
        try {
            const id = req.params.id
            const data = await itemService.getItem( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async deleteItem (req, res, next) {
        try {
            const id = req.params.id
            const data = await itemService.deleteItem( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async updateItem (req, res, next) {
        try {
            const {id, name}= req.body
            const data = await itemService.updateItem( {id, name} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }
}

export const itemController = new ItemController()