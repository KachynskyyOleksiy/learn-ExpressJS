var express = require('express');
var app = express();

// static middleware serving files from the public folder
app.use(express.static('public'));

// custom middleware
app.use(function(request, response, next) {
  console.log('Request come in from: ' + request.hostname);
  console.log('IP: ' + request.ip);
  console.log('Method: ' + request.method);
  console.log('originalUrl: ' + request.originalUrl);
  console.log('path: ' + request.path);
  next();
});

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
