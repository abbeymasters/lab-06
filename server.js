require('dotenv').config();

// requiring the app http event handler
const app = require('./lib/app');

// connect to mongo
require('./lib/connect')(process.env.MONGODB_URI);

// creating the server
const { createServer } = require('http');
const server = createServer(app);

// start the server by listening on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});