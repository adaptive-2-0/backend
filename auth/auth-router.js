const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-modal');

// POST - register
router.post('/register', (req, res) => {
  let email = req.body;
  const hash = bcrypt.hashSync(email.password, 8);
  email.password = hash;

  Users.add(email)
    .then(user => {
      res.status(201)
        .json({ user, message: `Thank you for registering` })
    })
    .catch(err => {
      console.log('Error with POST register', err)
      res.status(500)
        .json({ message: 'Could not register user' })
    })
});

// POST - login
router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.getBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200)
          .json({ token, message: `Welcome ${user.email}`, id: user.id })
      } else {
        res.status(401)
          .json({ message: 'Invalid credentials' })
      }
    })
    .catch(err => {
      console.log('Error with POST login', err)
      res.status(500)
        .json({ message: 'Could not login user' })
    })
});

function signToken(user) {
  const payload = {
    username: user.username,
    role: user.role_id
  };

  const secret = process.env.JWT_SECRET || 'is it secret, is it safe';

  const options = {
    expiresIn: '7d'
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;