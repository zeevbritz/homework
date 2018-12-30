// const url = require('url');

module.exports = url => {
    return (url, (req, res, next) => {
        req.query.magicWord === 'please' ? next() : next(new Error('where did you grow up?'));
    });
};