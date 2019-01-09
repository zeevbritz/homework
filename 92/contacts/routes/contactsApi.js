var debug = require('debug')('contacts:contacts');
var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        if (Object.keys(req.query).length) {
            let sql = 'SELECT * from contacts ';
            const existingParams = ['id', 'lastname', 'email'].filter(field => req.query[field]);
            // if (existingParams.length) {
            sql += ' WHERE ';
            sql += existingParams.map(field => `${field} = ?`).join(' AND ');

            db.query(sql, existingParams.map(field => req.query[field]), function (err, results) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                if (!results.length) {
                    return res.status(404).send(`No contact with ${existingParams.map(field => `${field} `).join(',')} ${existingParams.map(field => req.query[field])} found.`);
                }
                res.send(results);
            }
            );
            // }
        }
        else {
            db.query('SELECT * FROM contacts', (err, results) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.send(results);
            });
        }

    })
    .post((req, res, next) => {
        db.query(`INSERT INTO contacts(firstname, lastname, phone, email) 
            VALUES(?, ?, ?, ?)`,
            [req.body.firstname, req.body.lastname, req.body.phone, req.body.email],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                req.body.id = result.insertId;
                res.status(201).send(JSON.stringify(req.body));
            });
    });

router.delete('/:id', (req, res) => {
    db.query('SELECT * FROM contacts WHERE id=?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log(results);
        if (!results.length) {
            return res.status(404).send(`No contact with id ${req.params.id}`);
        }

        db.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(204).end();
        });
    });
});

module.exports = router;
