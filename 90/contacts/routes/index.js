var express = require('express');
var router = express.Router();
const myArray = require('../public/contacts');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contacts' });
});

// eslint-disable-next-line no-unused-vars
router.get('/contacts', function(req, res, next) {
  res.render('index', { title: 'Contacts', myArray:  myArray, partials: { content: 'addContact' } });
});

// eslint-disable-next-line no-unused-vars
router.get('/api/contacts', function(req, res, next) {
  res.json(myArray);
});

// eslint-disable-next-line no-unused-vars
router.post('/api/contacts', function(req, res, next) {
  myArray.push(req.body);
  res.redirect('/api/contacts');
});

module.exports = router;
