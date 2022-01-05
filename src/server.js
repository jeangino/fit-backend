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

const { MongoClient } = require("mongodb");
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    const collection = client.db("fitdb").collection("devices");
    // perform actions on the collection object
    console.log(collection);
    client.close();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
