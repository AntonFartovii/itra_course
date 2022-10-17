import {authService} from "../services/AuthService.js";
import {validationResult} from "express-validator";
import {ApiError} from "../error/ApiError.js";

export class AuthController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if ( !errors.isEmpty() ) {
                return next(ApiError.badRequest('Validation error', errors.array()))
            }
            const {email, password, role} = req.body
            const userData = await authService.registration( email, password, role )
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json( userData )
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
       try {
           const {email, password} = req.body
           const userData = await authService.login(email, password)
           res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
           return res.json( userData )
       } catch (e) {
           next(e)
       }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async check(req, res, next) {
        try {
            const token = await authService.check(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            await authService.delete( req.params.email )
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            console.log( activationLink )
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookie
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
            return res.json( userData )
        } catch (e) {
            next(e)
        }
    }


}

export const authController = new AuthController()