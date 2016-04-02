var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send("Hello world");
});

app.get('/blocks', function(request, response) {
  var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
  response.send(blocks);
});

// send pure html
// run in terminal:
// curl -i localhost:3000/blocks


app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
