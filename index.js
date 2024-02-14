const express = require("express")
require("dotenv").config()
const {connection} = require("./confing/db");
const {userRouter}= require("./routes/user.routes");
const {noteRouter}= require("./routes/notes.routes")

const app = express();
app.use(express.json())
app.use("/users",userRouter);
app.use("/notes",noteRouter);


app.get("/", (req, res)=>{
    res.send({msg: "welcome to home page"})
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`Connect to prot ${process.env.port}`)
        console.log(`Connected to DB`)
    }catch(err){
        console.log(err)
    }
})