var debug = require('debug')('contacts:contacts');
var express = require('express');
var router = express.Router();

/*let contacts = [
    {
        id: 1,
        firstname: 'Donald',
        lastname: 'Trump',
        email: 'dtrump@whitehouse.gov',
        phone: '1234567890'
    },
    {
        id: 2,
        firstname: 'Mike',
        lastname: 'Pence',
        email: 'mpence@whitehouse.gov',
        phone: '987633210'
    }
];
let nextId = contacts.length + 1;*/

router.get('/', function (req, res, next) {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('layout', {
            title: 'Contacts',
            partials: { content: 'contacts' },
            css: ['contacts.css'],
            contacts: results,
            noContacts: results.length === 0
        });
    });
});

router.route('/addContact')
    .get((req, res) => {
        res.render('layout', {
            title: 'Add Contact',
            partials: { content: 'addContact' },
            css: ['addContact.css']
        });
    })
    .post((req, res, next) => {
        // req.body.id = nextId++;
        debug('Adding contact', req.body);
        // contacts.push(req.body);
        db.query(`INSERT INTO contacts(firstname, lastname, phone, email) 
            VALUES(?, ?, ?, ?)`,
            [req.body.firstname, req.body.lastname, req.body.phone, req.body.email],
            (err, result) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/contacts');
            });
    });

// cant invoke a delete without javascript
router.get('/delete/:id', function (req, res) {
    debug('Deleting contact', req.params.id);
    // contacts = contacts.filter(c => c.id !== +req.params.id);
    db.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err, results) => {
        if (err) {
            return next(err);
        }
        res.redirect('/contacts');
    });
});

module.exports = router;
