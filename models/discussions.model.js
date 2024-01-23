const mongoose=require("mongoose");
const validator=require("validator");

const commentSchema=new mongoose.Schema({
    author:{type:String, required:true,immutable:true},
    content:{type:String,required:true,maxlength:500}
},
{ _id: false }
);

const discussionsSchema=new mongoose.Schema({
    title:{type:String,maxlength:150,required:true},
    author:{type:String,required:true,immutable:true},
    content:{type:String,default:""},
    comments:{
        type:[commentSchema],
        default:[]
    }
},
{ timestamps: true }
);


module.exports=mongoose.model("Discussion",discussionsSchema);