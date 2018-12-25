const http = require('http');

http.get(process.argv[2], res => {
    let theData = '';
    res.setEncoding('utf8');
    res.on('data', data => theData += data);
    res.on('end', () => {
        console.log(theData.length);
        console.log(theData);
    });
    res.on('error', () => console.error);
}).on('error', () => console.error);