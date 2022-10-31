
import {PropModel} from "../models/models.js";
import {ItemProps} from "../models/models.js";

function createQuery( dto ) {
    const {name, itemId, collectionId, type, limit = 10} = dto
    let include = {required: false, model: ItemProps, as: 'values'}
    if ( itemId ) include.where = {itemId}
    let query = {limit, include: [include]}
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



    async createPropValue( dto ) {
        const {itemId, propId, type, value} = dto
        if ( !itemId || !propId || !type ) throw new Error('')
        const propValue = await ItemProps.findOne({where:{itemId, propId}})
        if (propValue) return await this.updatePropValue( dto )

        const data = {itemId, propId, type}
        data[type] = value
        const item = await ItemProps.create( data )
        return item
    }

    async getAllPropValues(dto) {

        return await ItemProps.findAll({
            include: [PropModel]
        })
    }

    async getOnePropValue() {

    }

    async deletePropValue() {

    }

    async updatePropValue({itemId, propId, type, value}) {
        const propValue = await ItemProps.findOne({where:{itemId, propId}})
        propValue[type] = value
        return propValue.save()
    }
}

export const propService = new PropService()