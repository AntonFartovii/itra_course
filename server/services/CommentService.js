import {CommentModel} from "../models/models.js";

class CommentService {
    async create( dto ) {
        const comment = await CommentModel.create( dto )
        return comment
    }

    async getAll() {
        const comments = await CommentModel.findAll()
        return comments
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