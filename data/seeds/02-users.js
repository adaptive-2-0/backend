
exports.seed = function (knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          role_id: 2,
          email: 'userA@gmail.com',
          underage: true,
          password: 'abc123',
          username: 'NewGuyC',
          firstname: 'New',
          lastname: 'Guy',
          disability_id: 1,
          gender_id: 1,
          dob: 01 / 20 / 1993,
          bio: 'I am one of the first users in this app!!'
        },
        {
          id: 2,
          role_id: 2,
          email: 'userB@gmail.com',
          underage: true,
          password: 'abc123',
          username: 'NewGuyA',
          firstname: 'New',
          lastname: 'Guy',
          disability_id: 1,
          gender_id: 1,
          dob: 01 / 20 / 1993,
          bio: 'I am one of the first users in this app!!'
        },
        {
          id: 3,
          role_id: 2,
          email: 'userC@gmail.com',
          underage: true,
          password: 'abc123',
          username: 'NewGuyB',
          firstname: 'New',
          lastname: 'Guy',
          disability_id: 1,
          gender_id: 1,
          dob: 01 / 20 / 1993,
          bio: 'I am one of the first users in this app!!'
        }
      ]);
    });
};
