
import {TagModel} from "../models/models.js";

function createQuery( dto ) {
    const {name, collectionId, limit = 10} = dto
    let query = {limit}
    let where = {}
    if ( name ) where = {...where, name}
    return  {...query, where}
}

class TagService {

    async create( dto ) {
        const comment = await TagModel.create( dto )
        return comment
    }

    async getAll( dto ) {
        const query = createQuery( dto )
        return await TagModel.findAll( query )
    }

    async getOne( id ) {
        const comment = await TagModel.findByPk( id )
        return comment
    }

    async getOneByName( id ) {
        const comment = await TagModel.findOne({where: {name}})
        return comment
    }

    async delete( id ) {
        const comment = await TagModel.findByPk( id )
        if ( !comment ) throw new Error('')
        return await comment.destroy()
    }
}

export const tagService = new TagService()