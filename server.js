var express = require('express');
var app = express();

// static middleware serving files from the public folder
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
