const express = require('express');
const Users = require("../../controllers/users");
const auth = require("../../middleware/auth")
const router = express.Router();

// Sign up 

router.post("/signup",Users.Signup);

// Login 

router.post("/signin",Users.Signin);

// Update user verification

router.patch("/verifyuser/:userId", Users.UpdateUserVerification);

router.use(auth.verifyToken);

// Get current user
router.get("/current-user", Users.CurrentUser);

// get single user

router.get("/:id",Users.SingleUser);

// list of users

router.get("/",Users.ListUsers);

// Update users intrests
router.patch("/", Users.UpdateIntrests);

module.exports = router;