import {Router} from 'express'
import {authMiddleware} from "../middleware/auth-middleware.js";
import {roleController} from "../controllers/RoleController.js";

const router = Router()

router.post('/', await roleController.create)
router.get('/:value', await roleController.getRoleByValue)

export {router as roleRouter}