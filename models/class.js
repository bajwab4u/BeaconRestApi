const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classSchema = new Schema({
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required: [true, 'Please enter a name']
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
    }
    

});
  
  // static method to joining class
//   userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//       const auth = await bcrypt.compare(password, user.password);
//       if (auth) {
//         return user;
//       }
//       throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
//   };


const Class = mongoose.model('Class',classSchema);

module.exports = Class;