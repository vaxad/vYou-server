import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    title:String,
    message:String,
    creator:String,
    creator_id:String,
    tags:[String],
    selectedFile:String,
    likes:[String],
    date:{
        type:Date,
        default: new Date()
    }
  });

const post=mongoose.model('Post',postSchema);

export default post;