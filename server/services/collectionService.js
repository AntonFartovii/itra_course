import {CollectionModel as collectionModel} from "../models/models.js";
import {sequelize} from '../db.js'
import {PropModel} from "../models/models.js";
import {UserModel} from "../models/models.js";

class CollectionService {

    async createCollection ( dto ) {
        const collection = await collectionModel.create( dto )
        return collection
    }

    async getAll ( userId, limit ) {
        return await collectionModel.findAndCountAll({
            where: userId
        })
    }

    async getAllCollections ( userId, limit ) {

        const collections = async (userId, limit) => {
            let query = {
                limit,
                include: [UserModel],
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `(SELECT COUNT(*) FROM items AS item WHERE "collectionId" = collection.id)`),
                                'count',
                        ],
                    ],
                },
                order: [
                    [sequelize.literal('count'), 'DESC']
                ],
            }
            if ( userId ) query = {...query, where: {userId}}

            // console.log( query )
            return await collectionModel.findAndCountAll(query)
        }
        return collections(userId, limit)
    }

    async getCollection ( id ) {
        const collection = await collectionModel.findOne({
            where: {id},
            include: {model: PropModel, as: 'props'}
        })

        return collection
    }

    async deleteCollection ( id ) {
        const collection = await this.getCollection( id )
        if ( !collection ) return new Error('')
        return await collection.destroy()
    }

    async updateCollection ( dto ) {
        const {id, name, theme, description} = dto
        const collection = await this.getCollection( id )
        if (name) collection.name = name
        if (theme) collection.theme = theme
        if (description) collection.description = description
        return await collection.save()
    }

}


export const collectionService = new CollectionService()