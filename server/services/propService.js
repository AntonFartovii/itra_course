
import {PropModel} from "../models/models.js";

function createQuery( dto ) {
    const {name, collectionId, type, limit = 10} = dto
    let query = {limit}
    let where = {}
    if ( name ) where = {...where, name}
    if ( collectionId ) where = {...where, collectionId}
    if ( type ) where = {...where, type}
    return  {...query, where}
}

class PropService {
    async create( dto ) {
        const comment = await PropModel.create( dto )
        return comment
    }

    async getAll( dto ) {
        const query = createQuery( dto )
        return await PropModel.findAll( query )
    }

    async getOne( id ) {
        const comment = await PropModel.findByPk( id )
        return comment
    }

    async delete( id ) {
        const comment = await PropModel.findByPk( id )
        if ( !comment ) throw new Error('')
        return await comment.destroy()
    }
}

export const propService = new PropService()