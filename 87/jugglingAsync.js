const http = require('http');

let thedataArray = [];
let count = 0;

const get = index => {
    http.get(process.argv[2 + index], res => {
        let theData = '';
        res.setEncoding('utf8');
        res.on('data', data => theData += data);
        res.on('end', () => {
            thedataArray[index] = theData;
            if (++count === 3) {
                thedataArray.forEach(d => console.log(d));
            }
        });
        res.on('error', () => console.error);
    }).on('error', console.error);
};

for (let i = 0; i < 3; i++) {
    get(i);
}