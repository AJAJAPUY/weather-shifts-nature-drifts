const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon' };

http.createServer((request, response) => {
  const safePath = path.normalize(decodeURIComponent(request.url.split('?')[0])).replace(/^([.][.][/\\])+/, '');
  const file = path.join(root, safePath === '/' ? 'index.html' : safePath);
  if (!file.startsWith(root)) { response.writeHead(403); return response.end('Forbidden'); }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/html; charset=utf-8' });
    response.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log('Weather Shifts site is running.'));
