const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports.profile_get =  async (req, res) => {
    var decoded = await jwt.verify(req.cookies.jwt, 'Beacon');
    let user = await User.findById(decoded.id);
    res.json({id:user.id,name:user.name,category:user.category,email:user.email});
    
  }

module.exports.profile_post = (req,res) =>{
    res.render('signup');
}