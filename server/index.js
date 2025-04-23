const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

var authRouter = require('./routes/auth.route.js');
var userRouter = require('./routes/user.route.js');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));app.use(express.json());
app.use(cookieParser());

//const uri = process.env.MONGO_URI;
//mongoose.connect(uri);
const uri = "mongodb+srv://svetlana:GwVCZCTZltQ5xjXF@cluster1.woc5zow.mongodb.net/";

/*
mongoose.connect(uri, () => {
  console.log("Mongo connected");
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
*/
const mongodb = async () => {
  await mongoose.connect(uri);
  console.log("MongoDB database connection established successfully");
};

mongodb();


app.use("/api/", authRouter);
app.use("/api/users", userRouter);

app.get('/', function(req, res) {
  res.send(`Node and express server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});