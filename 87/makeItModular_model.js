const fs = require('fs');
const path = require('path');


module.exports = (dir, ext, callBack) => {
    fs.readdir(dir, 'utf8', (err, data) => {
        if (err) {
            return callBack(err);
        }
         let files = data.filter(file => path.extname(file) === `.${ext}`);
        callBack(null, files);
    });
};