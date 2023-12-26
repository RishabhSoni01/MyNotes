const mongoose = require('mongoose' ) ;
const { Schema } = mongoose;


const noteSchema = new Schema({
    // user is the id of the user who created the note
    // ref refers to the collection name from which the id is linked
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    }
  
});
//here note is the name of collection in database
// noteSchema is the schema of the collection
module.exports=  mongoose.model('note', noteSchema)