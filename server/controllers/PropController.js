import {validationResult} from "express-validator";
import {ApiError} from "../error/ApiError.js";
import {propService} from "../services/propService.js";

class PropController {
    async create(req, res, next) {
        try {
            const {name, collectionId} = req.body
            const data = await propService.create( {name, collectionId} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {name, collectionId, limit} = req.query
            const data = await propService.getAll({name, collectionId, limit})
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const data = await propService.getOne( id )
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

export const propController = new PropController()