const fs = require('fs');

fs.readdir(process.argv[2], 'utf8', (err, data) => {
    if (err) throw err;
    data.forEach(file => {
        if (file.slice(file.indexOf('.')) === `.${process.argv[3]}`) {
            console.log(file);
        }
    });
});