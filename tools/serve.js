/* Anteprima locale del sito, con lo stesso comportamento di GitHub Pages (index.html delle cartelle, 404.html per gli indirizzi inesistenti).
   Uso: node tools/serve.js   → http://localhost:4173 */
var http = require('http'), fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..'), PORT = process.env.PORT || 4173;
var TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

http.createServer(function (req, res) {
  var url = decodeURIComponent(req.url.split('?')[0]), file = path.join(ROOT, url);
  if (file.indexOf(ROOT) !== 0) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!/\/$/.test(url)) { res.writeHead(301, { Location: url + '/' }); return res.end(); }
    file = path.join(file, 'index.html');
  }
  var found = fs.existsSync(file);
  res.writeHead(found ? 200 : 404, { 'Content-Type': TYPES[found ? path.extname(file) : '.html'] || 'application/octet-stream' });
  fs.createReadStream(found ? file : path.join(ROOT, '404.html')).pipe(res);
}).listen(PORT, function () { console.log('http://localhost:' + PORT); });
