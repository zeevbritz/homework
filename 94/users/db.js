const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodeuser',
    password: 'test123',
    database: 'nodeuser'
});

module.exports = callback => {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err);
        } else {
            callback(null, connection);
        }
    });
};