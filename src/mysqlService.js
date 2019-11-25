const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'pirates'
});


module.exports.executeQuery = async function(queryString) {
  connection.query(queryString, function (error, results) {
    if (error) throw error;
    console.log(results);
  });
}