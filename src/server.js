const http = require('http');
const fs = require('fs');
const path = require('path');
const { validateSettings } = require('./settingsForm');

const port = process.env.PORT || 3000;

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  return 'application/octet-stream';
}

function sendFile(res, filePath) {
  const fullPath = path.join(__dirname, 'public', filePath);
  fs.readFile(fullPath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(fullPath) });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    sendFile(res, 'index.html');
    return;
  }

  if (req.method === 'GET' && req.url === '/styles.css') {
    sendFile(res, 'styles.css');
    return;
  }

  if (req.method === 'GET' && req.url === '/app.js') {
    sendFile(res, 'app.js');
    return;
  }

  if (req.method === 'POST' && req.url === '/settings') {
    const body = await readBody(req);
    const payload = JSON.parse(body);
    const result = validateSettings(payload);

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      ok: result.isValid,
      message: result.isValid ? 'Settings saved successfully.' : 'Please fix the highlighted issues.',
      errors: result.errors,
    }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`Settings form server running on http://localhost:${port}`);
});
