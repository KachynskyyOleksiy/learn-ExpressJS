var express = require('express');
var app = express();

// static middleware serving files from the public folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.get('/blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];
  if (request.query.limit >= 0){
    response.json(blocks.slice(0, request.query.limit));
  } else {
    response.json(blocks);
  };
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
