'use strict'
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'タイトルは必須です。',
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'コンテンツは必須です。',
        },
        len: {
          args: [1, 140],
          msg: '140文字以内で入力してください。',
        },
      },
    },
  })
  Article.associate = function (models) {
    Article.belongsTo(models.User)
    Article.belongsToMany(models.User, { through: 'Favorite', foreignKey: 'articleId'})
  }
  return Article
}
