const joi=require("joi");

const commentValidationSchema=joi.object().keys({
    author:joi.string().required(), 
    content:joi.string().required().max(500)
});

const discussionsValidationSchema= joi.object().keys({
    title:joi.string().max(150).required(),
    author:joi.string().required(),
    content:joi.string().default(""),
    comments: joi.array().items(commentValidationSchema).default([]),
});

//just pass the name of another schema as a reference, in order to join two joi schemas


const validateDiscussion =(req,res,next)=>{
    const {error}=discussionsValidationSchema.validate(req.body);
    if(error){
        res.status(422).json({message:" error from Joi validation result",error});
    }
    next();
}

const validateComment =(req,res,next)=>{
const comment=req.body;
 const {error}=commentValidationSchema.validate(comment);
 if(error){
    res.status(422).json({message:" error from Joi validation result",error});
}
next();
}

module.exports={validateDiscussion,validateComment};