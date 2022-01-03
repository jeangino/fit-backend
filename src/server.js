const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;

// See https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

app.get("/profile", (req, res) => {
  res.setHeader("content-type", "application/json");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.json({
    profile: {
      firstName: "Etienne",
      lastName: "Guilhaume",
      email: "etienne.guilhaume@gmail.com"
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
