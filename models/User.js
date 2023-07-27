import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type:String
    }],
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
  });
  const user=mongoose.model('User',userSchema);

  export default user;
