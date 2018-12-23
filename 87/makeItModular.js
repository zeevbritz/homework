const myModel = require('./makeItModular_model');

const filterdData = (err, data) => {
    if (err) {
        console.error(err);
    } else {
        data.forEach(file => {
            console.log(file);
        });
    }
};
myModel(process.argv[2], process.argv[3], filterdData);