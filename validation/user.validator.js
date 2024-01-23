const Joi=require("joi");

const userValidationSchema=Joi.object().keys({
    fullname:Joi.string().max(50).default(""),
    username:Joi.string().max(25).required(),
    email:Joi.string().email().required(),
});

const validateUser =(req,res,next)=>{
 const {error}=userValidationSchema.validate(req.body);
 if(error){
    res.json({message:"please correct the formate of passed values",error});
 }
 next();
}

module.exports={validateUser};