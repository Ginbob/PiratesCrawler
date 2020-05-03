const mysql = require('mysql');
const mysqlConfig = require('../configuration/mysqlConfig');

var connection = mysql.createConnection(mysqlConfig || {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pirates'
});

module.exports.executeQuery = async function (queryString) {
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        connection.query(queryString, undefined, function (error, results, fields) {
            if (error) {
                return connection.rollback(function () {
                    throw error;
                });
            }
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
    });
};