const Class = require('../models/class');
const Quiz = require('../models/quiz');
const Assignment = require('../models/assignment');
const User = require('../models/user');
// var path = require('path');
// var fs = require('fs');
// var multer = require('multer');
// var upload = multer({dest:'uploads/'});



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
  Class.find({teacher:user._id}).populate('teacher').populate('students.sid').populate('quiz.sid').populate('assignment.sid').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.contentType('application/json');
    // res.send(doc.img.data);
    res.json(results);
  });
};



module.exports.specificClassDetails_get = async (req,res) =>{
  let user = await User.findOne({email:req.params.email});
  Class.find({teacher:user._id} && {name:req.params.name}) .populate('teacher').populate('students.sid').populate('quiz.sid').populate('assignment.sid').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.contentType('application/json');
    // res.send(doc.img.data);
    res.json(results);
  });
};


module.exports.specificQuizDetails_get = async (req,res) =>{
  let user = await User.findOne({email:req.params.email});
  Quiz.find({subject:req.params.subject} && {title:req.params.title}).populate('submitter.sid').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
});
};

module.exports.specificClassDelete = async (req,res) =>{
  let user = await User.findOne({email:req.params.email});
  Quiz.deleteOne({teacher: user._id } && {title:req.params.name}, function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
});

};




module.exports.createQuiz_post = async  (req,res) =>{
  let user = await User.findOne({email:req.body.email});
  req.body["teacher"]=(user._id);
   try{
    const quizinfo = await Quiz.create(req.body);
    
    res.status(201);
    res.json(quizinfo);
    Class.findOneAndUpdate({teacher:req.body.teacher} && {name:req.body.subject} , {"$push": {
      "quiz": {
          "sid": quizinfo.id
      }
  }},function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
      // res.json(doc);
  });
    
   }
   catch(err){
    const errors = handleErrors(err);
    res.status(400);
    res.json(errors);    
   }
};




module.exports.createAssignment_post = async  (req,res) =>{
  let user = await User.findOne({email:req.body.email});
  req.body["teacher"]=(user._id);
   try{
    const assignmentinfo = await Assignment.create(req.body);
    
    res.status(201);
    res.json(assignmentinfo);
    Class.findOneAndUpdate({teacher:req.body.teacher} && {name:req.body.subject} , {"$push": {
      "assignment": {
          "sid": assignmentinfo.id
      }
  }},function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
      // res.json(doc);
  });
    
   }
   catch(err){
    const errors = handleErrors(err);
    res.status(400);
    res.json(errors);    
   }
};