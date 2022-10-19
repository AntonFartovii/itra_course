import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {collectionController} from "../controllers/CollectionController.js";

const router = Router()

router.post('/', await collectionController.createCollection)
router.get('/', await collectionController.getAllCollections)
router.get('/:id', await collectionController.getCollection)
router.delete('/:id', await collectionController.deleteCollection)
router.put('/:id', await collectionController.updateCollection)

export {router as collectionRouter}