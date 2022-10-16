import {ApiError} from "../error/ApiError.js";
import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as uuid from 'uuid'
import {mailService} from "./MailService.js";
import {tokenService} from "./TokenService.js";

class AuthService {

    async registration(email, password, role) {

        if (!email || !password) {
            throw ApiError.badRequest(`Un correct email ${email}`)
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw ApiError.badRequest(`User with ${email} exist yet`)
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()

        const user =
            await User.create({email, role, password: hashPassword, activationLink})

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        )

        const {accessToken, refreshToken} =
            await tokenService.generateTokens(user.id, user.email, user.role)

        await tokenService.saveToken(user.id, refreshToken)
        return {accessToken, refreshToken}

    }

    async login(email, password) {

        const user = await User.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest(`User with ${email} exist yet`)
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw ApiError.badRequest(`User with ${email} exist yet`)
        }

        const {accessToken, refreshToken} = await tokenService.generateTokens(user.id, user.email, user.role)
        return {accessToken, refreshToken}
    }

    async logout(refreshToken) {
        // const token = await tokenService.removeToken(refreshToken)
        // return token
    }

    async check(id, email, role) {
        const {accessToken, refreshToken} = await tokenService.generateTokens(id, email, role)
        return {accessToken, refreshToken}
    }

    async delete(email) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest(`User with ${email} does not exist`)
        }

        return await User.destroy(user)

    }
}

export const authService = new AuthService()