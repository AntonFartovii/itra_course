import {RoleModel} from "../models/models.js";

class RoleService {
    async createRole( dto ) {
        const role = await RoleModel.create( dto )
        return role
    }

    async getRoleByValue( value ) {
        const role = await RoleModel.findOne({where: {value}})
        return role
    }
}

export const roleService = new RoleService()