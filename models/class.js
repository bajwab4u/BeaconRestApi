const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classSchema = new Schema({
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required: [true, 'Please enter a name'],
        unique: true
    },
    description:{
        type:String,
        minlength: [20, 'Desciption Length should be atleast 20 Characters'],
        required: [true, 'Please enter description']
    },
    id:{
        type:String,
        required: [true, 'Please enter id'],
        minlength: [6, 'ID length is 6 characters'],
        unique: true
    },
    students: {
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }]
        
    },
    assignment:{
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'Assignment'
            }
        }]
    },
    quiz:{
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'Quiz'
            }
        }]
 
    }
    

});
  

const Class = mongoose.model('Class',classSchema);

module.exports = Class;