const Users=require("../models/user.model");

//fetching all the users from backend
const getAllUsers=async(req,res)=>{
    try{
        const result=await Users.find({});
        if(result.length){
            // we are using return here to sent a particular response at a time, otherwise it will result in sending multiple responses which will lead to the error
            return res.status(200).json(result);
        }   
        else{
           return res.status(404).json({ message: "No Users found" });
        }
        
    }
    catch(error){
        return res.status(500).json({message:"Internal server error while fetching the users data"});
    }

}

const getUserByUsername=async(req,res)=>{
    console.log(req.params); 
    //when data sent like this-> http://localhost:8082/user/ketan_00 then, req.params->{ username: 'ketan_00' }
    //when data sent like this-> query string, then-> req.query will give key-value pairs of parameters.
    // when data sent in body then-> req.body to get key-value pairs of inputs

    const getUsername=req.params.username;

    try{
        const result=await Users.find({username:getUsername});
        if(result){
            return res.status(200).json(result);
        }
        else{
            return res.status(404).json({message: "User not found!", getUsername});
        }
        
    }
    catch(error){
        return res.status(500).json({message:"Internal server error while fetching the users data"});

    }
}

//register the user
const registerUser=async(req,res)=>{
    try{
        console.log(req.body);
        const {fullname,username,email}=req.body;
       
        // const match=await Users.find({username}); manually match
            const newUser= new Users({fullname,username,email});
            const final=await newUser.save();

            return res.status(200).json(final);
         
    }
    catch(error){
        // console.log("conflict code: 409");
        if(error.code==11000){
            return res.status(409).json({ 
                    message: "Failed to create new user", 
                    reason: "Already Exists in DB" 
                });
        }
        else{
            return res.status(500).json({messege: "some error with the backend",error});
        }
        
    }
}


module.exports={registerUser,getAllUsers,getUserByUsername};