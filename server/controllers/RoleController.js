import {roleService} from "../services/RoleService.js";

class RoleController {

    async create(req, res, next) {
        try {
            const {value, description} = req.body
            const roleData = await roleService.createRole( {value, description} )
            return res.json( roleData )
        } catch (e) {
            next(e)
        }
    }

    async getRoleByValue(req, res, next) {
        try {
            const value = req.params.value
            const role = await roleService.getRoleByValue( value )
            return res.json( role )
        } catch (e) {
            next(e)
        }
    }
}

export const roleController = new RoleController()

