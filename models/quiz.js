const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quizSchema = new Schema({
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required: [false, 'Please enter a name']
    },
    subject:{
        type:String,
        required: [false, 'Please enter marks']
    },
    question:{
        type:String,
        required: [false, 'Please enter marks']
    },
    time:{
        type:String,
        required: [false, 'Please enter marks']
    },
    description:{
        type:String,
        required: [false, 'Please enter description']
    },
    marks:{
        type:String,
        required: [false, 'Please enter marks']
    },
    status:{
        type:Boolean
    },

    submitter: {
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'QuizSubmit'
            }
        }]
        
    }
    
    

});
  

const Quiz = mongoose.model('Quiz',quizSchema);

module.exports = Quiz;