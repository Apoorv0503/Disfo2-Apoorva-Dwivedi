const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const discussionsRoutes=require("./routes/discussions.routes");
const userRoutes=require("./routes/user.routes");

let port=process.env.PORT;
const app=express();
app.use(express.json());


mongoose.connect(`${process.env.DB_URI}`)
.then(()=>console.log("connected to DB at:",process.env.DB_URI))
.catch((e)=>console.log("Failed to connect to DB", e));

//discussion routes
// Without the leading slash("/"), the route becomes relative, (for request--> http://localhost:8082/discussion/new)
// and it doesn't match the /discussion path properly. By adding the slash, it ensures that the route is mounted at the correct path.
app.use("/discussion",discussionsRoutes);

//user routes
app.use("/user",userRoutes);


app.listen(port,()=>{
    console.log("server is listening to the port: ",port);
});