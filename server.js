const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
	console.log(`listening on port ${process.env.PORT}`);
});
