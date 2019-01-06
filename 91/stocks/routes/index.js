var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', { title: 'Express', partials: { content: 'index' } });
});

router.get('/stocks', function (req, res, next) {
  res.render('layout', { title: 'Express', partials: { content: 'search' } });
});

router.post('/stocks', function (req, res, next) {
  request(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.body.ticker}&apikey=Y2WR3EK2QUQB4YBX`,
    { json: true }, (err, res2, body) => {
      if (err) { return console.log(err); }
      const bestMatches = body['bestMatches'].map(m => ({ name: m['2. name'], symbol: m['1. symbol'] }));
      console.log(bestMatches);
      res.render('layout', { title: 'Express', partials: { content: 'bestMatches' }, bestMatches: bestMatches });
    });
});

router.get('/stocks/:symbol/:name', function (req, res, next) {
  request(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=Y2WR3EK2QUQB4YBX`,
    { json: true }, (err, res2, body) => {
      if (err) { return console.log(err); }
      let stock = Object.keys(body).map(k => ({
        name: req.params.name,
        symble: body[k]['01. symbol'],
        open: Number(body[k]['02. open']).toFixed(2),
        high: Number(body[k]['03. high']).toFixed(2),
        low: Number(body[k]['04. low']).toFixed(2),
        price: Number(body[k]['05. price']).toFixed(2),
        volume: body[k]['06. volume'],
        latestTradingDay: new Date(body[k]['07. latest trading day']).toDateString(),
        previousClose: Number(body[k]['08. previous close']).toFixed(2),
        change: body[k]['09. change'],
        changePercent: body[k]['10. change percent']
      }));
      res.render('layout', { title: 'Express', partials: { content: 'stocks' }, stock: stock });
    });
});

module.exports = router;