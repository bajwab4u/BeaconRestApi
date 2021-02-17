const Class = require('../models/class');
const User = require('../models/user');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name:'', description: '', id: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.id = 'This Joining ID Already Exists';
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


module.exports.createClass_post = async  (req,res) =>{
  let user = await User.findOne({email:req.body.email});
  req.body["teacher"]=(user._id);
   try{
    const classinfo = await Class.create(req.body);
    res.status(201);
    res.json(classinfo);
   }
   catch(err){
    const errors = handleErrors(err);
    res.status(400);
    res.json(errors);    
   }   
};

module.exports.classDetails_get = async (req,res) =>{
  let user = await User.findOne({email:req.params.email}); 
  Class.find({teacher:user._id}).populate('teacher').populate('students.sid').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
};