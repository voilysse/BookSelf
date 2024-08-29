const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var bookRouter = require('./routes/book');
var authorRouter = require('./routes/author');
var genreRouter = require('./routes/genre');
var reviewRouter = require('./routes/review');

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/api/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/author", authorRouter);
app.use("/api/genre", genreRouter);
app.use("/api/reviews", reviewRouter);

app.get('/', function(req, res) {
  res.send(`Node and express server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});