var express = require('express');
var app = express();

app.use('*/resources', express.static('_sdk/resources'));

app.all('/search.html', function(req, res){
  res.sendFile('search.html', {root: '_sdk'});
});

app.all('/*', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: '_sdk' });
});

module.exports = app;