import {sequelize} from '../db.js'
import Sequelize, {DataTypes} from 'sequelize'

export const UserModel = sequelize.define('user', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:          {type: DataTypes.STRING,  unique: true},
    password:       {type: DataTypes.STRING,  defaultValue: ""},
    role:           {type: DataTypes.STRING},
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

export const CollectionModel = sequelize.define('collection', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING},
    description:    {type: DataTypes.TEXT},
    theme:          {type: DataTypes.STRING}
})

export const ItemModel = sequelize.define('item', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING},
    like:           {type: DataTypes.INTEGER, defaultValue: 0}
})

export const LikeModel = sequelize.define('like', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

export const PropModel = sequelize.define('prop', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING},
    type:           {type: DataTypes.STRING}

})

export const TagModel = sequelize.define('tag', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING}
})

export const CommentModel = sequelize.define('comment', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value:          {type: DataTypes.TEXT}
})

export const TagItems = sequelize.define('tag_item', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

export const UserRoles = sequelize.define('user_role', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

export const ItemProps = sequelize.define('item_prop', {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

UserModel.hasMany(CollectionModel)
CollectionModel.belongsTo(UserModel)

UserModel.hasMany(ItemModel)
ItemModel.belongsTo(UserModel)

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

UserModel.hasMany(CommentModel)
CommentModel.belongsTo(UserModel)

CollectionModel.hasMany(ItemModel, {as: 'items'})
ItemModel.belongsTo(CollectionModel)

CollectionModel.hasMany(PropModel, {as: 'props'})
PropModel.belongsTo(CollectionModel)

ItemModel.hasMany(CommentModel)
CommentModel.belongsTo(ItemModel)

UserModel.hasMany(LikeModel, {as: 'likes'})
ItemModel.hasMany(LikeModel, {as: 'likes'})
LikeModel.belongsTo(ItemModel)
LikeModel.belongsTo(UserModel)


UserModel.belongsToMany(RoleModel, {through: UserRoles})
RoleModel.belongsToMany(UserModel, {through: UserRoles})

ItemModel.belongsToMany(TagModel, {through: TagItems, as: 'tags', foreignKey: 'itemId'})
TagModel.belongsToMany(ItemModel, {through: TagItems, as: 'items', foreignKey: 'tagId'})

PropModel.belongsToMany(ItemModel, {through: ItemProps})
ItemModel.belongsToMany(PropModel, {through: ItemProps})

// await UserModel.sync();
// await RoleModel.sync();
// await UserRoles.sync();
//
// await TagModel.sync();
// await ItemModel.sync();
// await TagItems.sync();

sequelize.sync()