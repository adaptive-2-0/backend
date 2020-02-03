const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authenticate = require('../auth/authenticate-middleware');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
// server.use('/api/users', authenticate, usersRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.status(200)
        .json({ message: 'API up and running', dbenv: process.env.DB_ENV });
});

module.exports = server;