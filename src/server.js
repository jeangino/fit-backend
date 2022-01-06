const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;

/// Our routes
var usersRouter = require("./routes/user");
app.use("/users", usersRouter);

// See https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

const uri = process.env.MONGODB_URI;

var mongoose = require("mongoose");
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'fitdb'});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
