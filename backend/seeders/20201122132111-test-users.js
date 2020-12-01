const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date()
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: '太郎',
          email: 'taro@example.com',
          password: bcrypt.hashSync('password', salt),
          createdAt: now,
          updatedAt: now,
        },
        {
          name: '次郎',
          email: 'jiro@example.com',
          password: bcrypt.hashSync('password', salt),
          createdAt: now,
          updatedAt: now,
        },
        {
          name: '三郎',
          email: 'saburo@example.com',
          password: bcrypt.hashSync('password', salt),
          createdAt: now,
          updatedAt: now,
        },
        {
          name: '四郎',
          email: 'shiro@example.com',
          password: bcrypt.hashSync('password', salt),
          createdAt: now,
          updatedAt: now,
        },
        {
          name: '五郎',
          email: 'goro@example.com',
          password: bcrypt.hashSync('password', salt),
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
