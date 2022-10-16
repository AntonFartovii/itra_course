import {sequelize} from '../db.js'
import Sequelize, {DataTypes} from 'sequelize'

export const User = sequelize.define('user', {
    id:       {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:    {type: DataTypes.STRING,  unique: true},
    password: {type: DataTypes.STRING,  defaultValue: ""},
    role:     {type: DataTypes.STRING,  defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING, defaultValue: ""}
})

export const TokenSchema = sequelize.define('token', {
    userId: {type: DataTypes.INTEGER},
    refreshToken: {type: DataTypes.STRING}
})

User.hasOne(TokenSchema)
TokenSchema.belongsTo(User)



