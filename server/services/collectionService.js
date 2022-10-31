import {CollectionModel as collectionModel} from "../models/models.js";
import {sequelize} from '../db.js'
import {PropModel} from "../models/models.js";
import {UserModel} from "../models/models.js";
import {ApiError} from "../error/ApiError.js";

class CollectionService {

    async createCollection ( dto ) {

        const collection = await collectionModel.create( dto )
        return collection
    }

    async updateCollection ( dto ) {
        const {id, name, theme, description, img, prevImg, newImg} = dto
        const collection = await this.getCollection( id )

        const data = (collection.img === prevImg) && newImg
            ? {name, theme, description}
            : {name, theme, description, img}

        collection.update( data )
        return await collection.save()
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

                include: [{model: UserModel, attributes: {exclude: ['password']}}],
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

        if (!collection) return new ApiError(400)
        return collection
    }

    async deleteCollection ( id ) {
        const collection = await this.getCollection( id )
        if ( !collection ) return new Error('')
        return await collection.destroy()
    }

}


export const collectionService = new CollectionService()