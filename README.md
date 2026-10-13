# andreamanzo.it

Sito personale di **Andrea Manzo**, graphic designer a Napoli: branding, advertising, packaging e web design.
Sito statico in HTML, CSS e JavaScript, senza dipendenze, cookie di terze parti o servizi esterni. Pubblicato con **GitHub Pages**.

## Struttura

```
index.html            Home                                  ┐
portfolio/            Portfolio e una cartella per progetto │ pagine generate da tools/build.js:
note-legali/          Note legali                           │ non modificarle a mano
404.html              indirizzi inesistenti                 │
sitemap.xml           elenco delle pagine indicizzabili     ┘
CNAME                 dominio personalizzato (andreamanzo.it)
.nojekyll             GitHub Pages pubblica i file così come sono
robots.txt            indicizzazione; blocco dei crawler per l'addestramento IA (vedi Note legali)
tools/
  build.js            genera le pagine statiche e la sitemap
  template.html       struttura comune a tutte le pagine (testata, piè di pagina, scheda contatto, galleria)
  og.html             sorgente dell'immagine di anteprima per i social (assets/img/og.png)
  serve.js            anteprima locale del sito
assets/
  css/tokens.css      font e token del design system (colori dei due temi, spazi, layout)
  css/components.css  componenti del design system
  css/site.css        layout delle pagine e versione mobile
  js/andreamanzo.js   icone e comportamenti (tema, galleria, scheda contatto, copia email)
  js/app.js           pagine, testi, progetti e navigazione
  fonts/              Inter Tight e JetBrains Mono (licenza SIL OFL)
  img/                immagine profilo, favicon, icona Apple e anteprima social
```

Ogni pagina ha un indirizzo e un file HTML propri (`/`, `/portfolio/`, `/portfolio/progetto-01/`, `/note-legali/`), con titolo, descrizione, dati strutturati e contenuto già scritti nel file: motori di ricerca e anteprime social li leggono senza eseguire JavaScript. Nel browser la navigazione resta istantanea, senza ricaricare la pagina. I vecchi indirizzi con `#` (es. `/#/portfolio`) vengono portati a quelli nuovi.

## Generare le pagine

Dopo ogni modifica a testi, progetti o `tools/template.html` (serve [Node.js](https://nodejs.org), nessuna dipendenza):

```
node tools/build.js     rigenera le pagine e la sitemap
node tools/serve.js     anteprima su http://localhost:4173
```

L'immagine di anteprima social si rigenera da `tools/og.html` con uno screenshot 1200×630, ad esempio con Edge:
`msedge --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=assets/img/og.png tools/og.html`

## Pubblicazione su GitHub Pages

1. Crea su GitHub un repository (es. `andreamanzo.it`) e carica **il contenuto di questa cartella** nella radice del repository, file nascosti compresi (`.nojekyll`).
2. Nel repository: **Settings → Pages → Build and deployment** → Source: *Deploy from a branch* → Branch: `main`, cartella `/ (root)` → **Save**.
3. In **Settings → Pages → Custom domain** scrivi `andreamanzo.it` (il file `CNAME` lo imposta già) e, quando disponibile, attiva **Enforce HTTPS**.
4. Nel pannello del tuo registrar di domini imposta i DNS:
   - record **A** per `andreamanzo.it` verso `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - record **CNAME** per `www` verso `<tuo-utente-github>.github.io`
   
   La propagazione può richiedere da pochi minuti a 24 ore. Verifica gli indirizzi aggiornati nella documentazione di GitHub Pages.

Ogni modifica caricata sul branch `main` viene pubblicata in automatico in circa un minuto.

## Modificare il sito

- **Testi e progetti**: `assets/js/app.js`, poi `node tools/build.js`. I progetti sono nell'elenco `PROJECTS`; i testi della Home hanno una versione desktop e una mobile nella funzione `dm('desktop', 'mobile')`.
- **Progetti e motori di ricerca**: ogni progetto può avere `desc` (descrizione nei risultati di ricerca), `cliente`, `storia`, `processo`, `servizi` e `imgs` (`[{src, alt, cap}]`: la prima immagine è la copertina e l'anteprima social; `alt` è il testo alternativo). Un progetto con `bozza:true` è un segnaposto: la pagina non viene indicizzata e resta fuori dalla sitemap.
- **Titoli e descrizioni delle pagine**: campi `title` e `desc` di ogni pagina in `assets/js/app.js`.
- **Note legali**: nella funzione `privacy()` di `assets/js/app.js`. Aggiorna la data e aggiungi la Partita IVA appena attribuita.
- **Colori e spazi**: `assets/css/tokens.css` (valori del design system).
- **Immagini dei progetti**: aggiungile in `assets/img/` in formato 4:3 o 3:4 e indica testo alternativo e didascalia.

## Diritti

© 2026 Andrea Manzo. Tutti i diritti riservati sui contenuti (testi, progetti, immagini, impaginazione).
Il codice è pubblicato solo per ospitare il sito: non è concesso in licenza per il riuso. Vedi le Note legali del sito.
I font Inter Tight e JetBrains Mono sono distribuiti con licenza SIL Open Font License (`assets/fonts/LICENSE-OFL.txt`).
