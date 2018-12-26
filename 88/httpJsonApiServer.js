const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const theUrl = url.parse(req.url, true);
    const time = new Date(theUrl.query.iso);

    const timeObjObj = {
        'hour': time.getHours(),
        'minute': time.getMinutes(),
        'second': time.getSeconds()
      };

    res.writeHead(200, { 'Content-Type': 'application/json' });

    switch (theUrl.pathname) {    
    case '/api/parsetime':
        res.write(JSON.stringify(timeObjObj));
        break;
    case '/api/unixtime':
        res.write(JSON.stringify({ 'unixtime': time.getTime() }));
        break;
    default:
        res.statusCode = 404;
        res.write('<h2 style="color: red">404. No such page</h2>');
    }
    res.end();
}).listen(process.argv[2]);