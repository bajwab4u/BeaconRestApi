const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quizSubmitSchema = new Schema({
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
  

const QuizSubmit = mongoose.model('QuizSubmit',quizSubmitSchema);

module.exports = QuizSubmit;