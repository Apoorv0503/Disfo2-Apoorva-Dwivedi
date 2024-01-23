const Users=require("../models/user.model");
const Discussions = require("../models/discussions.model")
const dotenv=require("dotenv");
dotenv.config();

const KEY=process.env["x-api-key"];

//Checks if the author is registered in the database or not.
const fetchUserInCollection=async(req,res,next)=>{
    const{author}=req.body;
    const result=await Users.find({username: author});
    if(result.length>0){
        next();
    }
    else{
        res.status(404).json({message: "user not found", author});
    }
}

//Checks whether the discussion with passed id exists or not
const fetchDiscussion = async(req,res,next)=>{
    const recieved=req.params.id;
    const result=await Discussions.find({_id:recieved});

    if(result.length>0){
        next();
    }
    else{
        res.status(404).json({message: "Discussion not found", discussionId: recieved});
    }
}

//check if proper header is passed in the req
const checkAdminKey =(req,res,next)=>{

    const recieved=req.headers["x-api-key"];
    if(recieved===KEY){
        next();
    }
    else{
        res.status(403).json({message:"Unauthorized Access"});
    }
}

//check if the given author is attached to the passed id
const verifyAuthor =async(req,res,next)=>{
    const recieved=req.params.id;
    const authorRecieved=req.body.author;

    
    const result=await Discussions.find({_id:recieved});

    if(result.length>0){
        console.log("result", result); //result is an array
        if(result[0].author==authorRecieved){
            next();
        }
        else{
            res.status(403).json({message: "Unauthorized Access"});
        }

    }
    else{
        res.status(404).json({message: "Discussion not found"});
    }
    
}
module.exports={fetchUserInCollection, checkAdminKey, verifyAuthor, fetchDiscussion};