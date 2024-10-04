const { hashPassword, matchPassword } = require("../helpers/authHelper");
const { usersModel } = require("../modals/UserModel");
const JWT = require("jsonwebtoken");
//New user registration  controller
const newUserRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      res.status(500).send({
        success: false,
        message: "All fields are mendatory",
      });
      return;
    }
    const userExist = await usersModel.findOne({ email });
    if (userExist) {
      res.status(300).send({
        success: false,
        message: "Email id already exist! You can login.",
      });
      return;
    }
    const encryptedPass = await hashPassword(password);
    await usersModel.create({ userName, email, password: encryptedPass });
    res.status(200).send({
      Success: true,
      message: "Registration successful, please login!",
    });
  } catch (error) {
    res.status(400).send({
      Success: false,
      message: "User registration failed",
    });
  }
};

//Find all users controller

const getAllUsers = async (req, res) => {
  try {
    const items = await usersModel.find().lean();
    if (items.length == 0) {
      res.status(300).json({ message: "Empty user list" });
      return;
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login Controller

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email id or password is empty" });
    }
    const findUser = await usersModel.findOne({ email });
    if (!findUser) {
      return res.status(500).send({
        success: false,
        message: "User not found with given email id",
      });
    }
    //calling user password match function
    const userCredentialsTrue = await matchPassword(
      password,
      findUser.password
    );
    const token = await JWT.sign(
      { _id: findUser._id },
      "hhsdcchhdddsdsdfsdfsdffs",
      {
        expiresIn: 120, //seconds
      }
    );
    if (!userCredentialsTrue) {
      return res
        .status(500)
        .send({ success: false, message: "Wrong credentials, try again" });
    }
    findUser.password = undefined;
    return res.status(200).send({
      success: true,
      token,
      message: "Logged in successfully",
      findUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: " Error in login API", error });
  }
};

//exporting all controllers

module.exports = {
  newUserRegister,
  getAllUsers,
  loginController,
};
