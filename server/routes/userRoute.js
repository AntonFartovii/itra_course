import {Router} from 'express'
import {userController} from "../controllers/UserController.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const router = Router()

router.get('/all', await authMiddleware, await userController.getUsers)
router.get('/:id', await userController.getUser)
router.post('/role', await userController.addRole)
router.post('/ban', await userController.addBan)
router.delete('/:id', await userController.delete)

export {router as userRouter}