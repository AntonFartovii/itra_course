import {collectionService} from "../services/CollectionService.js";


class CollectionController {

    async createCollection (req, res, next) {
        try {
            const {name, theme, userId} = req.body
            const data = await collectionService.createCollection( {name, theme, userId} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAllCollections (req, res, next) {
        try {
            let {userId, limit} = req.query
            limit = limit || 5
            const data = await collectionService.getAllCollections(userId, limit)
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAll (req, res, next) {
        try {
            let {userId, limit} = req.query
            limit = limit || 5
            const data = await collectionService.getAll(userId, limit)
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getCollection (req, res, next) {
        try {
            const id = req.params.id
            const data = await collectionService.getCollection( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async deleteCollection (req, res, next) {
        try {
            const id = req.params.id
            const data = await collectionService.deleteCollection( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async updateCollection (req, res, next) {
        try {
            const {id, name}= req.body
            const data = await collectionService.updateCollection( {id, name} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }
}

export const collectionController = new CollectionController()