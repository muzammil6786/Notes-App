const express=require("express")
const {notesModel}=require("../model/notes.model")
const {auth}=require("../middleware/auth.middleware")

const noteRouter = express.Router();
// adding notes for particular user 
noteRouter.post("/",auth,async(req, res) => {
    try {
          const note = new notesModel(req.body);
            await note.save();
            res.send({ msg: "New new note has been added", note });
          } 
     catch (err) {
      res.send({ msg: err });
    }
  });
// getting notes for the user who has logged in
noteRouter.get("/",auth,async(req,res)=>{
    try{
        // userid in notes === userid who is making request
        const notes= await notesModel.find({userID:req.body.userID})
        res.send({notes})
    }catch(err){
        res.send({error:err})
    }
})
// patch
noteRouter.patch("/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try{
        // userID present in the note === userID in the req.body
        const note= await notesModel.findOne({_id:noteID})
        if(note.userID===req.body.userID){
            await notesModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({msg:`the note with ID ${noteID} has been updated`})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({error:err})
    }
})
// delete
noteRouter.delete("/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try{
        // userID present in the note === userID in the req.body
        const note= await notesModel.findOne({_id:noteID})
        if(note.userID===req.body.userID){
            await notesModel.findByIdAndDelete({_id:noteID})
            res.send({msg:`the note with ID ${noteID} has been deleted`})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({error:err})
    }
})
  module.exports={
    noteRouter
  }
  