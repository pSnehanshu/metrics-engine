const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 7009;

http.createServer(app)
  .listen(PORT, () => console.log('Server running on port', PORT));
