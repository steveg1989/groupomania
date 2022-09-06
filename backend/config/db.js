const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Murphy1989',
  database: 'Groupomania',
});

module.exports.getDB = () => {
	return db;
};