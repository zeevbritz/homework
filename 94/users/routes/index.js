var express = require('express');
var router = express.Router();
const pool = require('../db');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('layout', { title: 'Log in or Create account', partials: { content: 'index' } });
});

router.get('/newUser', (req, res) => {
  res.render('layout', { title: 'Please fill out form then press submit', partials: { content: 'newUser' } });
});

router.post('/newUser', (req, res, next) => {
  pool((err, connection) => {
    if (err) {
      err.status(500);
      return next(err.message);
    }
    connection.query('INSERT INTO users(userId, password) VALUES(?, ?)',
      [req.body.username, req.body.password],
      // eslint-disable-next-line no-unused-vars
      (err, result) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
  });
});
module.exports = router;