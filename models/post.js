import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
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