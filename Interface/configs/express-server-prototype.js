var express = require('express');
var app = express();

app.use('*/resources', express.static('_prototype/resources'));


app.all('/*', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: '_prototype' });
});

module.exports = app;