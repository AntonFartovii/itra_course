import {propService} from "../services/propService.js";
import {tagService} from "../services/TagService.js";

class TagController {

    async create(req, res, next) {
        try {
            const {name} = req.body
            const data = await tagService.create( {name} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {name, limit} = req.query
            const data = await tagService.getAll({name, limit})
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const data = await tagService.getOne( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOneByName(req, res, next) {
        try {
            const name = req.query
            const data = await tagService.getOneByName( name )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id
            const data = await propService.delete( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }
}

export const tagController = new TagController()