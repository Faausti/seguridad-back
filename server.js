const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen("3001", () => {
  console.log("Started on PORT 3001");
});

const crypto = require("crypto");

app.post("/login", (req, res) => {
  // Insert Login Code Here
  let userMail = req.body.userMail;
  let password = req.body.password;
  res.send(`Username: ${userMail} Password: ${password}`);
});
