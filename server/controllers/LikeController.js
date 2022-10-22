
import {likeService} from "../services/likeServise.js";

class LikeController {
    async createLike (req, res, next) {
        try {
            const {userId, itemId} = req.body
            const data = await likeService.createLike({userId, itemId} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getLikes (req, res, next) {
        try {
            const {userId, itemId} = req.query
            const data = await likeService.getLikes( {userId, itemId} )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getLike (req, res, next) {
        try {
            const id = req.params.id
            const data = await likeService.getLike( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async deleteLike (req, res, next) {
        try {
            const id = req.params.id
            const data = await likeService.deleteLike( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }
}

export const likeController = new LikeController()