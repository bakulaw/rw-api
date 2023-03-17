var mysql = require('mysql');
var conn = mysql.createConnection({
  host: '127.0.0.1', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'nlpzjnwf',      // Replace with your database password
  database: 'adminritm_db_1',
  port:'8888'
 // // Replace with your database Name
}); 
 
conn.connect( function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
 // process.exit(1)
});
module.exports = conn;