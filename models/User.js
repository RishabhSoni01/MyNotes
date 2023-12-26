const mongoose= require('mongoose') ;
const { Schema } = mongoose; // to make schema we import schema module from mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    originalpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});
// here user is the name of collection in database
// userSchema is the schema of the collection 
module.exports=  mongoose.model('user', userSchema)