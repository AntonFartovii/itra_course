import {validationResult} from "express-validator";
import {ApiError} from "../error/ApiError.js";
import {propService} from "../services/propService.js";

class PropController {

    async createEntity(req, res, next) {
        try {
            const {name, collectionId, type} = req.body
            const data = await propService.create( {name, collectionId, type} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAllEntity(req, res, next) {
        try {
            const {name, itemId, collectionId, type, limit} = req.query
            const data = await propService.getAll({name, itemId, collectionId, type, limit})
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOneEntity(req, res, next) {
        try {
            const id = req.params.id
            const data = await propService.getOne( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async deleteEntity(req, res, next) {
        try {
            const id = req.params.id
            const data = await propService.delete( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }



    async createPropValue(req, res, next) {
        try {
            const {itemId, propId, type, value} = req.body
            const data = await propService.createPropValue(
                {itemId, propId, type, value}
                )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAllPropValues(req, res, next) {
        try {
            const {itemId} = req.query
            const data = await propService.getAllPropValues({itemId})
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOnePropValue(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async deletePropValue(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
}

export const propController = new PropController()