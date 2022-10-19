import {Router} from 'express'

const router = new Router()
import {authController} from '../controllers/AuthController.js'
import {body} from "express-validator";
import {authMiddleware} from "../middleware/auth-middleware.js";

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    await authController.registration)

router.post('/login', await authController.login)
router.get('/check', await authMiddleware, await authController.check)
router.post('/logout', await authController.logout)
router.get('/activate/:link', await authController.activate)
router.get('/refresh', await authController.refresh)

export {router as authRouter}