const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;

    //Hashing password
    const salt = await bcrypt.getSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //Convert normal password in the request body to the newly hashed password
    req.body.password = hashedPassword;

    const user =  new User(req.body);
    const existingUser = await User.findOne({email: req.body.email});

    //Checking if the user already exists
    if(existingUser) {
        return res.status(200).send({message: 'User already exists', success: false});
    } else {
        await user.save();
        return res.status(200).send({message: 'User registered successfully', success: true});
    }

  } catch (error) {
    return res.status(500).send({message: error.message, success: false});
  }
});

module.exports = router;