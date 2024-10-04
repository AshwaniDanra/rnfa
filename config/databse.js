const mongoose = require("mongoose");
const colors = require("colors");
//connecting to mongoDB database
const dbUrl =
  "mongodb+srv://codewithbihari1:QnAMwFoib5u5YEVp@firstapp.rb1pk.mongodb.net/react-native-app";

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log(
      `Connected to database ${mongoose.connection.host}`.bgBlue.white
    );
  } catch (err) {
    console.log(`Error in database connection ${err}`.bgRed.white);
  }
};
module.exports = { dbConnection };
