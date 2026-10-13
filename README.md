# andreamanzo.it

Sito personale di **Andrea Manzo**, graphic designer a Napoli: branding, advertising, packaging e web design.
Sito statico in HTML, CSS e JavaScript, senza dipendenze, cookie di terze parti o servizi esterni. Pubblicato con **GitHub Pages**.

## Struttura

```
index.html            pagina unica: il sito è un'app a schermata singola
404.html              indirizzi inesistenti → pagina 404 del sito
CNAME                 dominio personalizzato (andreamanzo.it)
.nojekyll             GitHub Pages pubblica i file così come sono
robots.txt            indicizzazione; blocco dei crawler per l'addestramento IA (vedi Note legali)
sitemap.xml
assets/
  css/tokens.css      font e token del design system (colori dei due temi, spazi, layout)
  css/components.css  componenti del design system
  css/site.css        layout delle pagine e versione mobile
  js/andreamanzo.js   icone e comportamenti (tema, galleria, scheda contatto, copia email)
  js/app.js           pagine, testi, progetti e navigazione
  fonts/              Inter Tight e JetBrains Mono (licenza SIL OFL)
  img/                immagine profilo e favicon
```

Le pagine sono gestite dentro `index.html` con indirizzi del tipo `/#/portfolio`, `/#/portfolio/progetto-01`, `/#/privacy` (Note legali).

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

- **Testi e progetti**: `assets/js/app.js`. I progetti sono nell'elenco `PROJECTS`; i testi della Home hanno una versione desktop e una mobile nella funzione `dm('desktop', 'mobile')`.
- **Note legali**: nella funzione `privacy()` di `assets/js/app.js`. Aggiorna la data e aggiungi la Partita IVA appena attribuita.
- **Colori e spazi**: `assets/css/tokens.css` (valori del design system).
- **Immagini dei progetti**: aggiungile in `assets/img/` in formato 4:3 o 3:4 e indica testo alternativo e didascalia.

## Diritti

© 2026 Andrea Manzo. Tutti i diritti riservati sui contenuti (testi, progetti, immagini, impaginazione).
Il codice è pubblicato solo per ospitare il sito: non è concesso in licenza per il riuso. Vedi le Note legali del sito.
I font Inter Tight e JetBrains Mono sono distribuiti con licenza SIL Open Font License (`assets/fonts/LICENSE-OFL.txt`).
