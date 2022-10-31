import {collectionService} from "../services/CollectionService.js";
import * as uuid from 'uuid'
import {getFilePath} from "../utils/getPath.js";
const url = import.meta.url

function createStaticPath( img ) {
    let fileStaticName = uuid.v4() + ".jpg"
    const fileStaticPath = getFilePath( url, `../static/${fileStaticName}`)
    img.mv( fileStaticPath )
    return fileStaticName
}

function prepareImg( query ) {
    if ( query === null ) return '0.jpg';
    return createStaticPath( query.img );
}

function prepareDto ( req ) {
    let {name, theme, userId, description} = req.body
    const img = prepareImg( req.files )
    return {name, theme, userId, description, img}
}

class CollectionController {

    async createCollection (req, res, next) {
        try {
            const dto = prepareDto( req )
            const data = await collectionService.createCollection( dto )

            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async updateCollection (req, res, next) {
        try {

            const dto = prepareDto( req )
            const {prevImg, newImg} = req.body
            const data = await collectionService.updateCollection(
                {...dto, id: req.body.id, prevImg, newImg}
                )

            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAllCollections (req, res, next) {
        try {
            let {userId, limit} = req.query
            limit = limit || 5
            const data = await collectionService.getAllCollections(userId, limit)
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getAll (req, res, next) {
        try {
            let {userId, limit} = req.query
            limit = limit || 5
            const data = await collectionService.getAll(userId, limit)
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async getCollection (req, res, next) {
        try {
            const id = req.params.id
            const data = await collectionService.getCollection( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }

    async deleteCollection (req, res, next) {
        try {
            const id = req.params.id
            const data = await collectionService.deleteCollection( id )
            return res.send( data )
        } catch (e) {
            next(e)
        }
    }


}

export const collectionController = new CollectionController()