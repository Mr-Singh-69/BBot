const http = require('http');

function keepAlive() {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Bot is alive!');
    res.end();
  }).listen(3000, () => {
    console.log('Keep-alive server is running on port 3000');
  });
}

module.exports = keepAlive; 