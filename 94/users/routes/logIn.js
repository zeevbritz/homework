const pool = require('../db');

/* GET home page. */
module.exports = ((req, res, next) => {
    pool((err, connection) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        connection.query('SELECT * FROM users WHERE userId = ? AND password = ?', [req.query.username, req.query.password], (err, results) => {

            connection.release();
            if (err) {
                return res.status(500).send(err.message);
            }
            if (!results.length) {
                return res.redirect('/');
            }
            req.session.user = req.query.username;
            return res.redirect('/loggedIn');
        });
    });
});
