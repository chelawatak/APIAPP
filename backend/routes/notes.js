const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

const { body, validationResult } = require("express-validator");


// 1. Create a note using POST: ./api/notes/newnote
router.post(
    "/newnote",fetchuser,
    [
        body("title", "Enter note title"),
        body("description", "Enter note description")
    ],

    async(req, res) => {
        try {
            const {title, description} = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({title, description, user:req.user.id});
            const savedNote = await note.save();
            res.json(savedNote);
        } 
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)


// 2. Fetch all notes using GET : ./api/notes/fetchnote
router.get(
    "/fetchnote",fetchuser,
    async(req, res) => {

        try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes);
        }
        
        
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
})



// 2. Delete a note using DELETE: ./api/notes/deletenote
router.delete(
    "/deletenote/:id",fetchuser,
    async(req, res) => {

        try {
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
            
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: note });
        }
        
        
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
})


module.exports = router;
