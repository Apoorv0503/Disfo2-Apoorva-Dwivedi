const dotenv = require("dotenv");
dotenv.config();


const AUTH_KEY= process.env["x-api-key"];
const authenticate=(req,res,next)=>{
    console.log(req.headers);

    //if header is matching
    if(req.headers["x-api-key"] === AUTH_KEY){
        // Authentication successful, call next
        next();
    }
    // if header is not matching 
    else{
        return res.status(403).json({ message: "Unauthorised Access." });
    }
}
    
module.exports={authenticate};