var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

// static middleware serving files from the public folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var blocks = {
  'Fixed': 'Fixed description', 
  'Movable': 'Movable description', 
  'Rotating': 'Rotating description'
};


app.param('name', function(request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  
  request.blockName = block;

  next();
});

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.get('/blocks', function(request, response) {
  if (request.query.limit >= 0){
    response.json(blocks.slice(0, request.query.limit));
  } else {
    response.json(Object.keys(blocks));
  };
});

app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.blockName];
  if (!description){
    response.status(404).json('No description found for ' + request.params.name);
  } else {
    response.json(description);
  };
});

app.post('/blocks', parseUrlencoded, function(request, response) {
  var newBlock = request.body;
  blocks[newBlock.name] = newBlock.description;

  response.status(201).json(newBlock.name);
});

// test:
// curl -i localhost:3000/blocks/Fixed
// curl -i localhost:3000/blocks/fixed
// curl -i localhost:3000/blocks/FiXeD

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
