var express = require('express');
var app = express();

// static middleware serving files from the public folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

var blocks = {
  'Fixed': 'Fixed description', 
  'Movable': 'Movable description', 
  'Rotating': 'Rotating description'
};

app.get('/blocks', function(request, response) {
  if (request.query.limit >= 0){
    response.json(blocks.slice(0, request.query.limit));
  } else {
    response.json(blocks);
  };
});

app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.params.name];
  if (!description){
    response.status(404).json('No description found for ' + request.params.name);
  } else {
    response.json(description);
  };
});

// test:
// curl -i localhost:3000/blocks/Fixed
// curl -i localhost:3000/blocks/Banana

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
