const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

	// lodash
	const diceThrow = _.random(1, 6);
	console.log(diceThrow, diceThrow)

	const greet = _.once(() => {
		console.log('hej')
	})

	const greet2 = () => console.log('hej 2');

	greet();
	greet();

	greet2();
	greet2();

	// set header content type
	res.setHeader('Content-Type', 'text/html');

	let path = './views/';
	switch(req.url) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-us':
			res.statusCode = 301;
			res.setHeader('Location', '/about');
			res.end();
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
	}

	// send an html file
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err)
			res.end();
		} else {
			// res.write(data);
			res.end(data);
		}
	})
})

server.listen(3000, 'localhost', () => {
	console.log('Listening for requests on port 3000')
})