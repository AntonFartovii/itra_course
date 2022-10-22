import {CollectionModel as collectionModel} from "../models/models.js";
import {sequelize} from '../db.js'

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
        const collection = await collectionModel.findByPk( id )

        return collection
    }

    async deleteCollection ( id ) {
        const collection = await this.getCollection( id )
        if ( !collection ) return new Error('')
        return await collection.destroy()
    }

    async updateCollection ( dto ) {
        const collection = await this.getCollection( dto.id )
    }


}


export const collectionService = new CollectionService()