import {UserModel as userModel} from "../models/models.js";
import {RoleModel as roleModel} from "../models/models.js";
import {UserRoles as userRoles} from "../models/models.js";
import {ApiError} from "../error/ApiError.js";
import {CollectionModel} from "../models/models.js";

class UserService {


    async getAllUsers() {
        return await userModel.findAll({
            attributes: {exclude: ['password', 'activationLink']},
            order: [['id', 'DESC']]
        })
    }

    async getUserById( id ) {
        return await userModel.findOne({
            where: {id},
            include: [CollectionModel],
            attributes: {exclude: ['password']}
        })
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

    async switchAdminRole(id) {
        const user = await this.getUserById( id )
        if (!user) throw new ApiError.badRequest('Cat not delete user, user does not exist');
        user.role = user.role === 'ADMIN'
            ? 'USER'
            : 'ADMIN'

        return await user.save()
    }

    async ban( id ) {
        const user = await this.getUserById(id)
        if ( !user ) throw new Error('')
        user.banned = !user.banned ? true : false
        await user.save()
        return user
    }

    async delete( id ) {
        const user = await this.getUserById(id)
        if (!user) throw new ApiError.badRequest('Cat not delete user, user does not exist');
        const userData = await userModel.destroy({where: {id}})
        return userData
    }


    async updateUser( dto ) {
        const {name, email,  newEmail} = dto
        const user = await userModel.findOne({where:{email}})
        if (!user) return new ApiError(400,'','')
        if ( newEmail ) user.email =  newEmail
        if ( name ) user.name =  name
        return await user.save()
    }
}


export const userService = new UserService()