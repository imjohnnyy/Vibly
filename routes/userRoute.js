const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;

    //Hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //Convert normal password in the request body to the newly hashed password
    req.body.password = hashedPassword;

    const user = new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });

    //Checking if the user already exists
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    } else {
      await user.save();
      return res
        .status(200)
        .send({ message: "User registered successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); //Fetch the user based on his/her email
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const passwordsMatched = await bcrypt.compareSync(
      // If user is present then compare the passwords
      req.body.password, //normal password
      user.password //encrypted password
    );
    if (passwordsMatched) {
      // If the passwords match then a token is generated by encrypting the User ID
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).send({
        // The encrypted token (which has the User ID) is then sent to the frontend
        message: "User successfully logged in",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/get-user-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = undefined; //we should never retrieve the password to the frontend
    return res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
