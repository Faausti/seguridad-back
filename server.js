const express = require("express");
const { Pool, Client } = require("pg");
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
const bcrypt = require("bcrypt");

const poolUser = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Fausti060499",
  port: "5432"
});

const poolPepper = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SeguridadConfig",
  password: "Fausti060499",
  port: "5432"
});

let pepper =''

poolPepper.query("SELECT * from userpepper", (err, res) => {
  pepper =res.rows[0].pepper
  poolPepper.end()
});

app.post("/login", (req, res) => {
  // Insert Login Code Here
  let userMail = req.body.userMail;
  let password = req.body.password;
  const salt = bcrypt.genSaltSync();
  let isValidMail = /[^'?="!]/g.test(userMail)
  let isValidPass = /[^'?="!]/g.test(password)
  if (isValidPass && isValidMail){
    const passwordHashed = bcrypt.hashSync(pepper + password, salt);
    poolUser.query(
      `INSERT INTO userInfo(id, mail, password, salt) VALUES ('${crypto.randomUUID()}', '${userMail}', '${passwordHashed}', '${salt}')`,
      (err, res) => {
        console.log(err, res);
        poolUser.end();
      }
    );
  }

  res.send(`Username: ${userMail} Password: ${password}`);
});
