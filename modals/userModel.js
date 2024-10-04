const mongoose = require("mongoose");

//creating user Schema
const usersSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, { Message: "User Name Is Important" }],
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: [true, "Please enter password"],
      min: 8,
      max: 80,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);
module.exports = { usersModel };

//module.exports = mongoose.model("users", usersSchema);
