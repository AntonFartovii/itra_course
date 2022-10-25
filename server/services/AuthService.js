import {ApiError} from "../error/ApiError.js";
import {UserModel} from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as uuid from 'uuid'
import {mailService} from "./MailService.js";
import {tokenService} from "./TokenService.js";
import {RoleModel} from "../models/models.js";

class AuthService {

    async registration(email, password, role = 'USER', roles = ['USER']) {

        if (!email || !password) {
            throw ApiError.badRequest(`Un correct email ${email}`)
        }

        await isCandidate( email )

        const hashPass = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        if ( email === 'anton@rza.by') role = 'ADMIN';
        const user = await UserModel.create({email, password: hashPass, role, activationLink})
        await addRole( user, roles )
        await sendMail( email, activationLink)
        return createTokens( user )
    }

    async login(email, password) {

        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest(`User with ${email} does not exist`)
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw ApiError.badRequest(`Uncorrect password `)
        }

        return createTokens( user )
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async check(id, email, role) {
        const {accessToken, refreshToken} = await tokenService.generateTokens(id, email, role)
        return {accessToken, refreshToken}
    }

    async delete(email) {
        console.log( email )
        const user = await UserModel.findOne({where: {email: email}})
        if (!user) throw new Error('');
        return await UserModel.destroy({where: {email: email}})
    }

    async activate(link) {
        const user = await UserModel.findOne({where: {activationLink: link}})
        if (!user) throw new Error('');
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAuthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if( !userData || !tokenFromDb ) {
            throw ApiError.unAuthorizedError()
        }

        const user = await UserModel.findOne({where: {id: userData.id}})
        return createTokens( user )
    }

}

async function createTokens( user ) {

    const {accessToken, refreshToken} = await tokenService.generateTokens(
        user.id, user.email, user.role, user.banned)
    await tokenService.saveToken(user.id, refreshToken)
    return {accessToken, refreshToken}
}

async function sendMail( email, activationLink ) {
    await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/auth/activate/${activationLink}`
    )

}

async function addRole( user, roles) {
    roles.forEach( async (value) => {
        const role =
            await RoleModel.findOne({where:{value}})
            || await RoleModel.create({value})
        await user.addRole( role )
    })
}

async function isCandidate(email) {
    const candidate = await UserModel.findOne({where: {email}})
    if (candidate) {
        throw ApiError.badRequest(`User with ${email} exist yet`)
    }
}

export const authService = new AuthService()