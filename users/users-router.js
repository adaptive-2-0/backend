const router = require('express').Router();

const Users = require('./users-modal');
const restricted = require('../auth/authenticate-middleware');

function checkRole(req, res, next) {
  if (req.token.role == 1) {
    next()
  } else {
    console.log('Not Authorized');
    res.status(403)
      .json({ message: 'Not authorized, you must be an ACS Admin' })
  }
};

router.get('/:id', (req, res) => {
  const id = req.params.id
  Users.getById(id)
    .then(user => {
      console.log(user)
      res.status(200)
        .json(user)
    })
    .catch(err => {
      console.log('Error with users GET', err)
      res.status(500)
        .json({ message: 'Could get retrieve user' })
    });
})

// GET - users
router.get('/', checkRole, restricted, (req, res) => {
  Users.get()
    .then(users => {
      res.status(200)
        .json(users);
    })
    .catch(err => {
      console.log('Error with users GET', err)
      res.status(500)
        .json({ message: 'Could get retrieve users' })
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  Users.editUser(id, update)
    .then(user => {
      res.status(200)
        .json(`User ${id}'s profile has been updated.`)
    })
    .catch(err => {
      console.log('Error with users GET', err)
      res.status(500)
        .json({ message: 'Could get retrieve user' })
    })
});

module.exports = router;