import {sequelize} from '../db.js'
import Sequelize, {DataTypes} from 'sequelize'

export const UserModel = sequelize.define('user', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:          {type: DataTypes.STRING,  unique: true},
    password:       {type: DataTypes.STRING,  defaultValue: ""},
    isActivated:    {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING,  defaultValue: ""},
    banned:         {type: DataTypes.BOOLEAN, defaultValue: false}
})

export const TokenModel = sequelize.define('token', {
    userId:         {type: DataTypes.INTEGER},
    refreshToken:   {type: DataTypes.STRING}
})

export const RoleModel = sequelize.define('role', {
    id:           {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value:        {type: DataTypes.STRING,  unique: true},
    description:  {type: DataTypes.STRING,  defaultValue: ""}
})

export const UserRoles = sequelize.define('user_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

UserModel.belongsToMany(RoleModel, {through: UserRoles})
RoleModel.belongsToMany(UserModel, {through: UserRoles})

await UserModel.sync();
await RoleModel.sync();
await UserRoles.sync()