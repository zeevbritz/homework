var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res) => {

        let params = ['id', 'lastname', 'email'];
        let values = '';
        let sql = 'SELECT * from contacts ';

        if (Object.keys(req.query).length) {
            params = params.filter(field => req.query[field]);
            sql += ' WHERE ';
            sql += params.map(field => `${field} = ?`).join(' AND ');
            values = params.map(field => req.query[field]);
        }

        db.query(sql, values, (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (values.length && !results.length) {
                return res.status(404).send(`No contact with ${params.map(field => `${field} `).join(',')} ${params.map(field => req.query[field])} found.`);
            }
            res.send(results);
        });

    })
    .post((req, res) => {
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

        // eslint-disable-next-line no-unused-vars
        db.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(204).end();
        });
    });
});

module.exports = router;
