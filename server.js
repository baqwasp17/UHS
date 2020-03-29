const http 		= require('http')
	, dotenv 	= require('dotenv')
	, app 		= require('./app')
	, server 	= http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
	console.log(`listening on port ${process.env.PORT}`);
});
