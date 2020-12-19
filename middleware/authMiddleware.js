const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token,'Beacon', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('login');
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
     res.end();
  }
};

module.exports =  requireAuth ;