import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {tagController} from "../controllers/TagController.js";

const router = Router()

router.post('/', await tagController.create)
router.post('/name/:name', await tagController.getOneByName)
router.get('/', await tagController.getAll)
router.get('/:id', await tagController.getOne)
router.delete('/:id', await tagController.delete)
export {router as tagRouter}