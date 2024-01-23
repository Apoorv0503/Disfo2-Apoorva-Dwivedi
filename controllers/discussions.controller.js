const Discussions = require("../models/discussions.model")

const getDiscussionsAll1 = async (req, res) => {
    try {
        const result = await Discussions.find({});
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "No Discussions found" });
        }

    }
    catch (error) {
        res.status(500).json({ message: "some internal server error", error });
    }
}

const createDiscussion = async (req, res) => {

    try {
        console.log(req.body);
        const { title, author, content } = req.body;

        const newDiscussion = new Discussions({ title, author, content });
        const result = await newDiscussion.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "some internal server error", error });
    }
}

const getDiscussionsByUsername = async (req, res) => {
    // console.log("req.params: ",req.params);
    try {
        const usernameRecieved = req.params.username
        const result = await Discussions.find({ author: usernameRecieved });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "No discussions found for this user" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }



}

const getDiscussionsById = async (req, res) => {
    try {
        console.log("hello");
        console.log(req.params);
        const Id = req.params.id;
        const result = await Discussions.find({ _id: Id });

        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "No discussions found for this id" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const deleteDiscussionsById = async (req, res) => {
    
    try {
        console.log("hello form controller: deleteDiscussionsById");
        const Id = req.params.id;
        const authorRecieved = req.body.author;
        const result = await Discussions.findOneAndDelete({ _id: Id, author: authorRecieved });
        res.status(200).json(result);
    }
    catch (error) {
        res.send(500).json({ message: "Unable to verify author",error });
    }
}

const updateDiscussionsById=async(req,res)=>{
    try{
        const Id = req.params.id;

        //updates recieved in body
        // const authorRecieved = req.body.author;
        // const discussionRecieved=req.body.content;

        const filter = { _id: Id }; //conditions to find the document
        const update = req.body; //updates to be perfomed

        const result = await Discussions.findOneAndUpdate(filter, update, { new: true }); 
        res.status(200).json(result);

    }
    catch(error){
        res.status(500).json({message: "Unable to verify author", error});
    }
}

const AddCommentWithAuhtorId=async(req,res)=>{
    try{
        const Id = req.params.id;
        const {author,content}=req.body;

        //created a new comment to be inserted
        let newComment={author,content};

        //conditions to find the document
        const filter = { _id: Id }; 

        //updates to be perfomed --> we are pushing a new comment in update, use $push keyword here,  used 
        // also if a new author is also comming then that will be updated too
        const update={$push:{comments: newComment}};


        const result = await Discussions.findOneAndUpdate(filter, update, { new: true });
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message: "Unable to verify author", error});
    }
}

module.exports = { 
    createDiscussion, 
    getDiscussionsAll1, 
    getDiscussionsByUsername, 
    getDiscussionsById, 
    deleteDiscussionsById, 
    updateDiscussionsById,
    AddCommentWithAuhtorId 
};