const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'centerbeam.proxy.rlwy.net',
  user: 'root',
  password: 'JjESEyIPThXsGnxlPmYBTESJkNmIgQYv',
  database: 'railway',
  port: 51597,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the pool connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión al pool:', err);
  } else {
    console.log('Conectado al pool de MySQL Railway');
    connection.release(); // devolver la conexión al pool
  }
});

module.exports = db;
