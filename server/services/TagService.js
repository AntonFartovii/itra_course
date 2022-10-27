
import {TagModel, ItemModel} from "../models/models.js";
import {UserModel} from "../models/models.js";
import {CollectionModel} from "../models/models.js";

function createQuery( dto ) {
    const {name, limit = 10} = dto
    let query = {limit}
    let where = {}
    if ( name ) where = {...where, name}
    return  {...query, where, include: [
            {model: ItemModel, as: 'items'}
        ]}
}

class TagService {

    async create( dto ) {
        const entity = await TagModel.create( dto )
        return entity
    }

    async getAll( dto ) {
        if (dto.name) return this.getOneByName( dto.name )
        const query = createQuery( dto )
        const entity = await TagModel.findAll( query )
        return entity
    }

    async getOne( id ) {
        const entity = await TagModel.findOne({
            where:{id},
            include: [
                {model: ItemModel, as: 'items', include: [UserModel, CollectionModel]}
                ]
        } )
        return entity
    }

    async getOneByName( name ) {
        const entity = await TagModel.findOne({
            where: {name},
            include: [
                {model: ItemModel, as: 'items'}
            ]
        })
        return entity
    }

    async delete( id ) {
        const entity = await TagModel.findByPk( id )
        if ( !entity ) throw new Error('')
        return await entity.destroy()
    }
}

export const tagService = new TagService()