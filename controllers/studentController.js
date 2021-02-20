const Class = require('../models/class');
const User = require('../models/user');


module.exports.joinClass_put = async (req,res) =>{
    let user = await User.findOne({email:req.body.email});
    Class.findOneAndUpdate({id:req.body.id}, {"$push": {
        "students": {
            "sid": user.id
        }
    }},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        res.json(doc);
    });

  };

  module.exports.classDetails_get = async (req,res) =>{
    let user = await User.findOne({email:req.params.email}); 
    Class.find({"students.sid":user._id}).populate('teacher').populate('students.sid').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
  };
  