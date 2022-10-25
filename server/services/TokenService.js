import jwt from "jsonwebtoken";
import {TokenModel as tokenModel} from "../models/models.js";

class TokenService {

    generateTokens = (id, email, role, banned) => {
        const accessToken = jwt.sign(
            {id, email, role, banned}, process.env.JWT_ACCESS_SECRET,{expiresIn: '24h'}
        )
        const refreshToken = jwt.sign(
            {id, email, role, banned}, process.env.JWT_REFRESH_SECRET,{expiresIn: '24d'}
        )
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({where: {userId: userId}})
        console.log('tokenData: ', tokenData )
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.destroy(
            {where: {refreshToken: refreshToken}}
            )
        return tokenData
    }

    validateAccessToken(token) {
        try {
            console.log()
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        return await tokenModel.findOne({where: {refreshToken}})
    }
}

export const tokenService = new TokenService()