'use strict'
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcryptjs')
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'nameは必須です。',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'emailは必須です。',
          },
          isEmail: {
            msg: 'emailの形式で入力してください。',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'passwordは必須です。',
          },
          len: {
            args: [6, 50],
            msg: '6文字以上50文字以内で入力してください。',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        },
      }
    }
  )
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  User.associate = function (models) {
    User.hasMany(models.Article, {foreignKey: 'userId'})
    User.hasMany(models.Favorite, {foreignKey: 'userId'})
  }
  return User
}
