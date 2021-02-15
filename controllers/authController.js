const User = require('../models/user');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name:'', email: '', password: '' ,category:''  };
  
    
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect Password';
    }
  
    // duplicate email error
    if (err.code === 11000) {
       errors.email = 'That email is already registered';
       return errors;
    }
    // validation errors
    if (err.message.includes('User validation failed')) {
          Object.values(err.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message;
        });
        
      }
  
   
  
    return errors;
  }

  // create  json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Beacon', {
    expiresIn: maxAge
  });
};
  




module.exports.login_post = async (req,res) =>{
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {maxAge: maxAge * 1000 });
    res.status(200).json({ category: user.category,name:user.name});
   
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400);
    res.json(errors);
  }
}

module.exports.signup_post = async  (req,res) =>{
   try{
    const user = await User.create(req.body);
    res.status(201);
    res.json(user);
   }
   catch(err){
    const errors = handleErrors(err);
    res.status(400);
    res.json(errors);
    
   }
    
    
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt',"", { maxAge: 1 });
  res.end();
};