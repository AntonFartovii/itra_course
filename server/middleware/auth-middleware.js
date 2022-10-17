import {ApiError} from "../error/ApiError.js";
import {tokenService} from "../services/TokenService.js";

export function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({message: "Не авторизован"});
        req.user = tokenService.validateAccessToken()
        next();

    } catch (e) {
        res.status(401).json({message: "Не авторизован"});
        // ApiError.unAuthorizedError()
    }

    //
    // try {
    //     console.log( 'middle')
    //     console.log( req.headers )
    //     return ApiError.unAuthorizedError()
    //     const accessToken = req.headers.authorization.split(' ')[1]
    //     if ( !accessToken ) {
    //         return ApiError.unAuthorizedError()
    //     }
    //
    //     const userData = tokenService.validateAccessToken()
    //     if ( !userData ) {
    //         return ApiError.unAuthorizedError()
    //     }
    //
    //     req.user = userData
    //     next(ApiError.unAuthorizedError())
    // } catch (e) {
    //     return next(
    //         ApiError.unAuthorizedError()
    //     )
    // }
}