// const url = require('url');

module.exports = (req, res, next) => {
        req.query.magicWord === 'please' ? next() : next(new Error('where did you grow up?'));
    };