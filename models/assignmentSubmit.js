const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const assignmentSubmitSchema = new Schema({
    submitter: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    email:{
        type:String,
        required: [false, 'Please enter description']
    },
    answer:{
        type:String,
        required: [false, 'Please enter description']
    },
    ObtainMarks:{
        type:String,
        required: [false, 'Please enter marks']
    }
    
    
    

});
  

const AssignmentSubmit = mongoose.model('AssignmentSubmit',assignmentSubmitSchema);

module.exports = AssignmentSubmit;