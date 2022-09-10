const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

// connec to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Groupomania",
});

module.exports.getDB = () => {
  return db;
};
