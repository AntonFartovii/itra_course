import {CollectionModel as collectionModel} from "../models/models.js";
import {ItemModel} from "../models/models.js";
import {Sequelize} from "sequelize";
import {sequelize} from '../db.js'

class CollectionService {

    async createCollection ( dto ) {
        const collection = await collectionModel.create( dto )
        return collection
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

    async createItem ( dto ) {
        const item = await itemModel.create( dto )
        return item
    }

    async getItems () {
        const items = await itemModel.findAll()
        return items
    }

    async getItem ( id ) {
        const item = await itemModel.findByPk( id )
        return item
    }

    async deleteItem ( id ) {
        const item = await itemModel.findByPk( id )
        if ( !item ) return new Error('')
        return await item.destroy()
    }

    async updateItem ( dto ) {
        const item = await itemModel.findByPk( dto.id )
    }

}


export const collectionService = new CollectionService()