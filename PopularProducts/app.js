'use strict';
const port = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const seed = require('./seed');
const app = express();
const jsonParser = bodyParser.json()
const server = http.createServer(app);
 
var products = seed.getProducts().products;

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/products', (req, res) => {
    return res.send(products);
});

app.post('/api/vote', jsonParser, (req, res) => {
    console.log(req.body);
    let body = req.body;
    let index = products.findIndex(x => x.id === body.id);
    if (index > -1) {
        products[index].votes++;
    }
    res.status(200).send('OK');
});

server.listen(port, () => {
    console.log('server listening on *:' + port);
});
