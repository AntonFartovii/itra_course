import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {itemController} from "../controllers/ItemController.js";

const router = Router()

router.post('/', await itemController.createItem)
router.get('/', await itemController.getItems)
router.get('/:id', await itemController.getItem)
router.delete('/:id', await itemController.deleteItem)
router.put('/:id', await itemController.updateItem)



export {router as itemRouter}