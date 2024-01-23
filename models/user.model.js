const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    fullname:{type:String,maxlength:50},
    username:{type:String},
    email:{
        type:String,
        unique:true,
        required:true,
        validate:(value)=>validator.isEmail(value)
    }
});

module.exports=mongoose.model("User",userSchema);
// this will creata a collection with the name of "users"