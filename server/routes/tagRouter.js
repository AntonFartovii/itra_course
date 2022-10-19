import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";

const router = Router()

router.post('/')
router.get('/:value')

export {router as tagRouter}