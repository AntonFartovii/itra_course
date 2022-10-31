import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {collectionController} from "../controllers/CollectionController.js";

const router = Router()

router.post('/',await authMiddleware, await collectionController.createCollection)
router.get('/', await collectionController.getAllCollections)
router.get('/:id', await collectionController.getCollection)
router.delete('/:id', await authMiddleware, await collectionController.deleteCollection)
router.put('/', await authMiddleware, await collectionController.updateCollection)

export {router as collectionRouter}