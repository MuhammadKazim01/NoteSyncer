const express = require("express");
require("dotenv").config();
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuserdata = require("../middleware/fetchuserdata");

const saltRounds = 10;
const secret = process.env.SECRET;

// User Register
router.post(
  "/signup",

  body("name")
    .isLength({ min: 3 })
    .withMessage("Name should be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("An account with this email already exists");
      }
    }),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const authToken = jwt.sign({ user: { id: newUser.id } }, secret, {
        expiresIn: "2h",
      });

      await newUser.save();
      res.status(201).json({ token: authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// User Signin
router.post(
  "/signin",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").exists().withMessage("Password cannot be empty"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      const authToken = jwt.sign({ user: { id: user.id } }, secret, {
        expiresIn: "2h",
      });

      res.status(200).json({ token: authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Get user data
router.post("/getuser", fetchuserdata, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await User.findById(userId).select("-password");
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
