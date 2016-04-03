var express = require('express');
var app = express();

// static middlewares serving files from the public and bower folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
