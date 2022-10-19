import {Router} from 'express'

const router = new Router()
import {commentController} from '../controllers/commentController.js'
import {body} from "express-validator";


router.post('/', await commentController.create)
router.get('/', await commentController.getAll)
router.get('/:id', await commentController.getOne)
router.delete('/:id', await commentController.delete)

export {router as commentRouter}