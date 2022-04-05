const express = require('express');
const words = require('./words.js');

const app = express();

app.use(express.static('client'));
app.listen(8080);

