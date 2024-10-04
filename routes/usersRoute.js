const express = require("express");
const {
  newUserRegister,
  getAllUsers,
  loginController,
} = require("../controllers/usersController");
//router object
const router = express.Router();

//routes
//Get All Users
router.get("", getAllUsers);
//New User Regiswtration
router.post("/register", newUserRegister);
// User Login
router.post("/login", loginController);
//exporting router
module.exports = router;
