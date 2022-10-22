import {LikeModel} from "../models/models.js";

function createQuery( dto ) {
    let query = {}
    let where = {}
    const {userId, itemId} = dto
    if (userId) where = {...where, userId}
    if (itemId) where = {...where, itemId}
    return  {...query, where}
}

class LikeService {

    async createLike( dto ) {
        const {userId, itemId} = dto
        const like = await LikeModel.findOne({where: {userId, itemId}})
        if (like) return await like.destroy();
        return await LikeModel.create({userId, itemId} )
    }

    async getLikes( dto ) {
        let query = createQuery( dto )
        return await LikeModel.findAll( query )
    }

    async getLike( id ) {
        return await LikeModel.findByPk( id )
    }

    async deleteLike( id ) {
        const like = await this.getLike( id )
        if (!like) throw new Error('')
        return await like.destroy( id )
    }
}

export const likeService = new LikeService()