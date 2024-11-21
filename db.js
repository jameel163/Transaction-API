// db.js
require('dotenv').config();
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,     // MySQL server hostname
  user:process.env.DB_USER ,          // MySQL username
  password: process.env.DB_PASSWORD,  // MySQL password (replace with your own)
  database: process.env.DB_DBNAME // MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

module.exports = connection;