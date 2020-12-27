'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    nid: DataTypes.STRING,
    passwordResetFlag: {type: DataTypes.BOOLEAN, defaultValue: true},
    active: {type: DataTypes.BOOLEAN, defaultValue: true },
    last_login: {type: DataTypes.DATE, defaultValue: null}
  }, {defaultScope: {
  attributes: { exclude: ['password'] },
}});
 
  User.associate = function(models) {
    // Replace entity_id with role_id, so user will have some role and each role belongs to some entity
    //User.belongsTo(models.Um_Role,{foreignKey:'role_id'});
    //User.hasMany(models.Comment,{foreignKey : "user_id"})

    };
  return User;
};
