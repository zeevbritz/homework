var express = require('express');
var router = express.Router();
const mongo = require('mongodb');

let people;

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function (req, res, next) {
  people.find().toArray((err, persons) => {
    if (err) {
      return next(err);
    }

    console.log(persons);
    res.render('index', { title: 'Contacts', people: persons, partials: { content: 'addContact' } });    
  });
});

// eslint-disable-next-line no-unused-vars
router.post('/api/contacts', function (req, res, next) {
  // eslint-disable-next-line no-unused-vars
  people.insertOne(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

mongo.MongoClient('mongodb://localhost:27017').connect((err, client) => {
  if (err) {
    console.error(err);
  }

  const db = client.db('contacts');
  people = db.collection('people');
});

module.exports = router;
