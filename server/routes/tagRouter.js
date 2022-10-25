import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {tagController} from "../controllers/TagController.js";

const router = Router()

router.post('/', await tagController.create)
router.get('/', await tagController.getAll)
router.get('/:value')

export {router as tagRouter}