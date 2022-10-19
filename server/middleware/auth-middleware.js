import {tokenService} from "../services/TokenService.js";

export function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({message: "Не авторизован"});
        req.user = tokenService.validateAccessToken(token)
        next();

    } catch (e) {
        res.status(401).json({message: "Не авторизован"});
    }
}