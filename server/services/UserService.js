import {UserModel as userModel} from "../models/models.js";
import {RoleModel as roleModel} from "../models/models.js";
import {UserRoles as userRoles} from "../models/models.js";
import {RoleModel} from "../models/models.js";

class UserService {

    async getAllUsers() {
        const users = await userModel.findAll({include: [RoleModel]})
        return users
    }

    async getUserById( id ) {
        const user = await userModel.findOne({where: {id}, include: [RoleModel]})
        return user
    }

    async role( id, value ) {

        const user = await userModel.findByPk( id )
        const role = await roleModel.findOne({where: {value}})

        if ( !(role && user) ) throw new Error('')

        const ref = await userRoles.findOne({
            where: {
                userId: user.id,
                roleId: role.id
            }
        })

        if (ref) return await ref.destroy();
        return await user.addRole( role )
    }

    async ban( id ) {
        const user = await userModel.findOne({where: {id}})
        if ( !user ) throw new Error('')
        user.banned = !user.banned ? true : false
        await user.save()
        return user
    }

    async delete( id ) {
        const user = await userModel.findByPk( id )
        if (!user) throw new Error('Cat not delete user, user does not exist');
        const userData = await userModel.destroy({where: {id}})
        return userData
    }

}


export const userService = new UserService()