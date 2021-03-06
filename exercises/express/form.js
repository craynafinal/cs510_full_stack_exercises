'use strict';

var express = require('express'); // do not change this line
var parser = require('body-parser'); // do not change this line

var message = [];

var server = express();

server.use(parser.urlencoded({
	'extended': false,
	'limit': 1024
}));

//server.use( parser.json() );

server.get('/form', function (req, res) {
	res.status(200);

	res.set({
		'Content-Type': 'text/html'
	});

	res.write('<!DOCTYPE html>');
	res.write('<html>');
		res.write('<body>');
			res.write('<form action="/new" method="post">');
				res.write('<input type="text" name="name">');
				res.write('<input type="text" name="message">');
				res.write('<input type="submit" value="submit">');
			res.write('</form>');
		res.write('</body>');
	res.write('</html>');

	res.end();
});

server.post('/new', function(req, res) {
	res.status(200);

  res.set({
    'Content-Type': 'text/plain'
  });

	message.push(req.body.name + ': ' + req.body.message);

	res.send('thank you for your message');
});

server.get('/list', function(req, res) {
	res.status(200);

  res.set({
    'Content-Type': 'text/plain'
  });

	if (message !== []) {
		res.send(message.join('\n'));
	} else {
		res.send('');
	}
});

server.listen(process.env.PORT || 8080);

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you will need to use the body parser to retrieve the post data

// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message' in plain text
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message\nanother name: another message' in plain text
//   [the server restarts and looses all messages]
//   http://localhost:8080/list should return '' in plain text

/*
res.status(200);

res.set({
	'Content-Type': 'text/html'
});

res.write('<!DOCTYPE html>');
res.write('<html>');
	res.write('<body>');
		res.write('<form action="/new" method="post">');
			res.write('<input type="text" name="name">');
			res.write('<input type="text" name="message">');
			res.write('<input type="submit" value="submit">');
		res.write('</form>');
	res.write('</body>');
res.write('</html>');

res.end();
*/
