import jwt from "jsonwebtoken";
import {TokenSchema} from "../models/models.js";

class TokenService {
    generateTokens = (id, email, role) => {
        const accessToken = jwt.sign(
            {id, email, role}, process.env.JWT_ACCESS_SECRET,{expiresIn: '24h'}
        )
        const refreshToken = jwt.sign(
            {id, email, role}, process.env.JWT_REFRESH_SECRET,{expiresIn: '24d'}
        )
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenSchema.findOne({where: {userId: userId}})
        console.log('tokenData: ', tokenData )
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenSchema.create({userId, refreshToken})
        return token
    }
}

export const tokenService = new TokenService()