// db.js
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1254",
  database: "nexus_db", // DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected!");
});

module.exports = db;
