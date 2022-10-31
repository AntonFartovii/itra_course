import {Router} from 'express'

const router = new Router()
import {commentController} from '../controllers/CommentController.js'
import {authMiddleware} from "../middleware/auth-middleware.js";


router.post('/', await authMiddleware, await commentController.create)
router.get('/', await commentController.getAll)
router.get('/:id', await commentController.getOne)
router.delete('/:id', await authMiddleware, await commentController.delete)

export {router as commentRouter}