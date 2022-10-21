import {userService} from "../services/UserService.js";

class UserController {

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json( users )
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const id = req.params.id
            const user = await userService.getUserById( id )
            return res.send( user )
        } catch (e) {
            next(e)
        }
    }

    async addRole(req, res, next) {
        try {
            const {id, value} = req.body
            const userData = await userService.role( id, value )
            return res.send( userData )
        } catch (e) {
            next(e)
        }

    }

    async switchAdminRole(req, res, next) {
        try {
            const {id} = req.body
            const userData = await userService.switchAdminRole(id)
            return res.send( userData )
        } catch (e) {
            next(e)
        }
    }

    async addBan(req, res, next) {
        try {
            const {id} = req.body
            const userData = await userService.ban( id )
            return res.send( userData )
        } catch (e) {
            next(e)
        }
    }

    async delete (req, res, next) {
        try {
            const id = req.params.id
            const userData = await userService.delete( id )
            res.send( userData )
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController()