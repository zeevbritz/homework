const net = require('net');

const padding =  num => {
    if(num < 10) {
        return '0' + num;
    }
    return num;
};

const server = net.createServer(function (socket) {
    const date = new Date();
    socket.end(`${date.getFullYear()}-${padding(date.getMonth()) + 1}-${padding(date.getDate())} ${padding(date.getHours())}:${padding(date.getMinutes())}\n`);
  });
  server.listen(process.argv[2]);