const app = require('connect')();

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.use('/home', (req, res) => {
    res.end('<h1>Welcome to PCS</h1>');
});

app.use('/about', (req, res) => {
    res.end('<h1>PCS is a non profit great place</h1>');
});

app.use(require('./queryParser'));

app.use('/admin',require('./authorization'));

app.use('/admin', (req, res) => {
    res.end('<h2>Hello Admin</h2>');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.end(`<h3>OOPS: ${err.message} </h3>`);
});

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    res.statusCode = 404;
    res.end('<h2>No such page. Try again</h2>');
});

app.listen(80);