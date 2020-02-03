const db = require('../data/dbConfig');

module.exports = {
  get,
  getBy,
  getById,
  add,
  deleteUser,
  editUser,
};

// Users
function get() {
  return db('users')
    .select('id', 'email', 'password', 'role_id');
};

function getBy(filter) {
  return db('users')
    .where(filter)
    .first();
};

function getById(id) {
  console.log(id)
  return db('user_profiles')
  .where({ id })
  .first();
};

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return getById({ id })
    });
};

function editUser(id, update) {
  return db('user_profiles')
  .where({ id })
  .update(update)
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
};
