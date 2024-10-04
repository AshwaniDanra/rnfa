const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { dbConnection } = require("./config/databse");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//database configuration
dbConnection();

//Routes

app.use("/api/v1/", require("./routes/usersRoute"));
app.get("/",(req,res)=>{
  res.status(200).send({
   "success": true, 
    "message":"Server deployed Online"
  })
})
//PORT
const PORT = process.env.PORT || 3000;
//Creating Server
app.listen(PORT, (req, res) => {
  console.log("Server is running on PORT ", PORT);
});
