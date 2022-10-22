import {validationResult} from "express-validator";
import {ApiError} from "../error/ApiError.js";
import {authService} from "../services/AuthService.js";
import {commentService} from "../services/CommentService.js";

class CommentController {
    async create(req, res, next) {
        try {
            const {value, userId, itemId} = req.body
            const data = await commentService.create( {value, userId, itemId} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId, itemId, limit} = req.query
            const data = await commentService.getAll({userId, itemId, limit})
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const data = await commentService.getOne( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id
            const data = await commentService.delete( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }
}

export const commentController = new CommentController()