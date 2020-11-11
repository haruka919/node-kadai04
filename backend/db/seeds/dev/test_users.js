exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'name1', email: 'email1@test.com', password: 'password' },
        { id: 2, name: 'name2', email: 'email2@test.com', password: 'password' },
        { id: 3, name: 'name3', email: 'email3@test.com', password: 'password' },
      ])
    })
}
