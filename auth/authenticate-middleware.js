const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe';
// console.log('authorization')
    jwt.verify(authorization, secret, function(err, decodedToken) {
// console.log('verify token')
      if (err) {
        res.status(401)
          .json({ message: 'Invalid token' })
      } else {
        req.token = decodedToken;
// console.log('passed restricted')
        next()
      }
    });
  } else {
    res.status(500)
      .json({ message: 'Please try to login again' })
  }
};