import {Router} from 'express'
import {propController} from "../controllers/PropController.js";

const router = Router()

router.post('/', await propController.create)
router.get('/', await propController.getAll)
router.get('/:id', await propController.getOne)
router.delete('/:id', await propController.delete)



export {router as propRouter}