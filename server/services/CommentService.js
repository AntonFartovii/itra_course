import {CommentModel} from "../models/models.js";
import {UserModel} from "../models/models.js";

function createQuery( dto ) {
    const {userId, itemId, limit = 10} = dto
    let query = {limit, include: [UserModel]}
    let where = {}
    if ( userId ) where = {...where, userId}
    if ( itemId ) where = {...where, itemId}
    return  {...query, where}
}

class CommentService {
    async create( dto ) {
        const comment = await CommentModel.create( dto )
        return comment
    }

    async getAll( dto ) {
        const query = createQuery( dto )
        return await CommentModel.findAll( query )
    }

    async getOne( id ) {
        const comment = await CommentModel.findByPk( id )
        return comment
    }

    async delete( id ) {
        const comment = await CommentModel.findByPk( id )
        if ( !comment ) return new Error('')
        return await comment.destroy()
    }
}

export const commentService = new CommentService()