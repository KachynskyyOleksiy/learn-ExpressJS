var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send("Hello world");
});

app.get('/blocks', function(request, response) {
  response.redirect(301, '/parts');
});

// status 301: move Permanently

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
