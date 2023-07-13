const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ql_ban_hang',
});

conn.connect((err) => {
  if (err) {
    console.log('Ket noi DB that bai');
  }
});

module.exports = conn;
