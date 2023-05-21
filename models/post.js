import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default: new Date()
    }
});

const post=mongoose.model('Post',postSchema);

export default post;