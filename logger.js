module.exports = function (request, response, next) {
  var start = +new Date(); // plus sign converts date Object to miliseconds
  var stream = process.stdout; // writeble stream
  var url = request.url;
  var method = request.method;

  response.on('finish', function() {
    var duration = +new Date() - start;
    var message = method + ' to ' + url + 
      '\ntook ' + duration + ' ms \n\n';
    stream.write(message);
  });

  next();
}