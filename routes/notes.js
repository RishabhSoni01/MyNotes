const express = require("express"); 
const router = express.Router(); // Router is a method in express which helps in defining routes
const Notes = require("../models/Note");
let fetchuser = require("../middleware/fetchuser"); 
const { body, validationResult } = require("express-validator"); // used in body of request

//Route 1: fetch all notes of a user using GET
// login required
// fetchuser is a middleware which fetches the user id from jwt token
// and appends it to req object
// fetchuser is defined in middleware/fetchuser.js

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //fetch all the notes linked with the user id
    const note = await Notes.find({ user: req.user.id });
    res.json(note); //return the notes
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error has occured");
  }
});

//Route 2: Add a new  note using POST
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors in request, return bad request and the errors
    // console.log(req);
    const error = validationResult(req);
    // console.log(error.array().length);

    if (error.array().length > 0) {
      return res.status(400).json({ error: error.array() });
    }
    // create a new note and save it to database
    try {
      const note = await Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        date:Date.now()
      });
      
      res.send(note);
    } catch (error) {
      //catch error if any
      console.log(error.message);
      res.status(500).send("Internal server error has occured");
    }
  }
);

//Route 3: Update an existing note using PUT request using id of note to be updated and fetchuser middleware
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    let { title, description, tag } = req.body; // destructure the request body

    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // newNote.date=Date.now();
    //find the note to be updated and update it
    //params is used to the parameters passed in the url
    let note = await Notes.findById(req.params.id);
    //check whether note exist or not
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // allow updation only if login user same as requested user is same
    //is used for security purpose
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    //mongo query to find and update the note
    //new:true is used to return the updated note
    // $set is used to set the new note
    //req.params.id is used to find the note to be updated
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note }); //return the updated note
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error has occured");
  }
});

//Route 4: Delete an existing note using DELETE
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be updated and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // allow deletion only if login user same as requested user is same
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    //mongo query to find and delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error has occured");
  }
});

module.exports = router;
