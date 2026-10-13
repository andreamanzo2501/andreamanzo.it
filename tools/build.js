/* Genera le pagine statiche del sito a partire da assets/js/app.js e tools/template.html.
   Ogni indirizzo diventa un file HTML completo (titolo, descrizione, dati strutturati e contenuto già scritti),
   così motori di ricerca e anteprime social leggono la pagina senza eseguire JavaScript.
   Uso: node tools/build.js   (da rilanciare dopo ogni modifica a testi, progetti o template) */
var fs = require('fs'), path = require('path'), crypto = require('crypto');
var ROOT = path.join(__dirname, '..'), ORIGIN = 'https://andreamanzo.it';

global.window = global;
require('../assets/js/andreamanzo.js');
var site = require('../assets/js/app.js');
var template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

var OG_IMAGE = { src: '/assets/img/og.png', alt: 'Andrea Manzo — Graphic designer a Napoli' };
var NAMES = { home: 'Home', portfolio: 'Portfolio', 'note-legali': 'Note legali' };
var PERSON = {
  '@type': 'Person', '@id': ORIGIN + '/#andrea-manzo', name: 'Andrea Manzo', jobTitle: 'Graphic designer',
  url: ORIGIN + '/', image: ORIGIN + '/assets/img/immagine-profilo.jpg', email: 'mailto:ciao@andreamanzo.it',
  address: { '@type': 'PostalAddress', addressLocality: 'Napoli', addressCountry: 'IT' },
  knowsAbout: ['Branding', 'Advertising', 'Packaging', 'Web design'],
  sameAs: ['https://www.instagram.com/andreamanzo.it/', 'https://www.linkedin.com/in/andrea-manzo-2b4987187/']
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function abs(u) { return /^https?:/.test(u) ? u : ORIGIN + u; }

function structured(pg) {
  var graph = [];
  if (pg.id === 'home') graph.push({ '@type': 'WebSite', '@id': ORIGIN + '/#sito', url: ORIGIN + '/', name: 'Andrea Manzo', inLanguage: 'it', publisher: { '@id': PERSON['@id'] } }, PERSON);
  else graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: pg.crumbs.map(function (c, i) {
      return { '@type': 'ListItem', position: i + 1, name: NAMES[c[0]] || (pg.p ? pg.p.title : c[0]), item: ORIGIN + (c[1] || pg.path) };
    })
  });
  if (pg.id === 'project') {
    var work = { '@type': 'CreativeWork', name: pg.p.title, description: pg.desc, url: ORIGIN + pg.path, genre: pg.p.cat, inLanguage: 'it', creator: { '@id': PERSON['@id'], '@type': 'Person', name: 'Andrea Manzo' } };
    if (pg.p.imgs) work.image = pg.p.imgs.map(function (s) { return abs(s.src); });
    graph.push(work);
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function head(pg) {
  var img = pg.p && pg.p.imgs ? pg.p.imgs[0] : OG_IMAGE, lines = [
    '<title>' + esc(pg.title) + '</title>',
    '<meta name="description" content="' + esc(pg.desc) + '">'
  ];
  if (pg.noindex) return lines.concat('<meta name="robots" content="noindex">').join('\n');
  lines.push(
    '<link rel="canonical" href="' + ORIGIN + pg.path + '">',
    '<meta property="og:site_name" content="Andrea Manzo">',
    '<meta property="og:locale" content="it_IT">',
    '<meta property="og:type" content="' + (pg.id === 'project' ? 'article' : 'website') + '">',
    '<meta property="og:title" content="' + esc(pg.title) + '">',
    '<meta property="og:description" content="' + esc(pg.desc) + '">',
    '<meta property="og:url" content="' + ORIGIN + pg.path + '">',
    '<meta property="og:image" content="' + esc(abs(img.src)) + '">',
    '<meta property="og:image:alt" content="' + esc(img.alt) + '">'
  );
  if (img === OG_IMAGE) lines.push('<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">');
  lines.push('<meta name="twitter:card" content="summary_large_image">', '<script type="application/ld+json">' + structured(pg) + '</script>');
  return lines.join('\n');
}

function write(file, text) {
  var full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, text);
}

/* Le pagine dei progetti vengono rigenerate da zero, così quelle dei progetti rimossi spariscono */
fs.rmSync(path.join(ROOT, 'portfolio'), { recursive: true, force: true });

var urls = ['/', '/portfolio/', '/note-legali/'].concat(site.PROJECTS.map(function (p) { return '/portfolio/' + p.slug + '/'; }), ['/404.html']);
var cv = site.cvHTML(), today = new Date().toISOString().slice(0, 10), indexed = [];
/* Data di ultima modifica per la sitemap: cambia solo quando cambia il contenuto della pagina */
var datesFile = path.join(__dirname, 'lastmod.json'), dates = fs.existsSync(datesFile) ? JSON.parse(fs.readFileSync(datesFile, 'utf8')) : {}, kept = {};

urls.forEach(function (url) {
  var pg = site.resolve(url);
  var html = template.replace('{{head}}', function () { return head(pg); })
    .replace('{{path}}', function () { return site.pathHTML(pg.crumbs); })
    .replace('{{view}}', function () { return pg.html; })
    .replace('{{cv}}', function () { return cv; });
  write(/\/$/.test(pg.path) ? pg.path + 'index.html' : pg.path, html);
  if (pg.noindex) return;
  var hash = crypto.createHash('sha1').update(html).digest('hex').slice(0, 12), prev = dates[pg.path];
  kept[pg.path] = prev && prev.hash === hash ? prev : { hash: hash, date: today };
  indexed.push(pg.path);
});

fs.writeFileSync(datesFile, JSON.stringify(kept, null, 2) + '\n');
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  indexed.map(function (u) { return '  <url><loc>' + ORIGIN + u + '</loc><lastmod>' + kept[u].date + '</lastmod></url>'; }).join('\n') + '\n</urlset>\n');

console.log('Pagine generate: ' + urls.length + ' (' + indexed.length + ' nella sitemap)');
