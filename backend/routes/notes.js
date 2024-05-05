const express = require("express");
const fetchuserdata = require("../middleware/fetchuserdata");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Fetch all notes
router.get("/fetchall", fetchuserdata, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Note.find({ user: userId });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/addnote",
  fetchuserdata,

  body("title")
    .isLength({ min: 3 })
    .withMessage("title should have atleast 4 characters"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("description should have atleast 4 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag, date } = req.body;
    try {
      const note = new Note({
        user: req.user.id,
        title,
        description,
        tag,
        date,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put(
  "/updatenote/:id",
  fetchuserdata,

  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title should have at least 4 characters"),
    body("description")
      .isLength({ min: 3 })
      .withMessage("Description should have at least 4 characters"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
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

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed to update this note");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/deletenote/:id", fetchuserdata, async (req, res) => {
  let note = await Note.findById(req.params.id);
  try {
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to delete this note");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
