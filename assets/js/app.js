(function(){
var I=AndreaManzo.icons, ico=function(n){return '<svg class="am-ico" viewBox="0 0 24 24" aria-hidden="true">'+I[n]+'</svg>'};
var LOREM='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
var CATS=['Branding','Advertising','Packaging','Web design'], MONTHS=['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];
var SERV={'Branding':['Logo','Palette','Linee guida'],'Web design':['Sito web','UI'],'Packaging':['Packaging','Etichette'],'Advertising':['Campagna','Affissioni']};
function slugc(c){return c.toLowerCase().replace(/ /g,'-')}
function catLink(c,label){return '<a class="am-textlink" href="#/portfolio?f='+slugc(c)+'">'+label+'</a>'}
var pad=function(n){return (n<10?'0':'')+n};
var PROJECTS=[];for(var k=1;k<=1;k++)PROJECTS.push({tipo:'Progetto accademico',n:k,slug:'progetto-'+pad(k),title:'Progetto '+pad(k),cat:CATS[k%4],date:MONTHS[(14-k)%12]+' '+(k<5?2026:2025)});
function ph(w,h){return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"/>')}
var state={filter:'Tutti',q:'',page:0};
var $=function(s,r){return (r||document).querySelector(s)}, view=$('#view'), main=$('#main');
var gallery=null, galFoot=$('#galFoot');

function setPath(parts){
  var h='<a href="#/">~</a><span class="am-path__sep">/</span>';
  parts.forEach(function(p,i){ if(i<parts.length-1) h+='<a href="'+p[1]+'">'+p[0]+'</a><span class="am-path__sep">/</span>'; else h+='<span aria-current="page">'+p[0]+'</span>'; });
  $('#path').innerHTML=h;
}

function card(p){return '<a class="am-project" href="#/portfolio/'+p.slug+'"><div class="am-project__media"></div><div class="am-project__head"><h3 class="am-project__title">'+p.title+'</h3>'+ico('arrow-right')+'</div><span class="am-caption">'+p.cat+' · '+p.date+'</span></a>'}
function hero(body){return '<section class="pg-intro"><div class="pg-hero"><span class="am-avatar"><img src="assets/img/immagine-profilo.jpg" alt="Immagine profilo di Andrea Manzo"></span><div class="pg-hero__txt"><h1 class="am-title">Andrea Manzo</h1><p class="am-label">Graphic designer</p></div></div>'+(body||'')+'</section>'}
function intro(title,body){return '<section class="pg-intro"><h1 class="am-title">'+title+'</h1>'+(body||'')+'</section>'}
function block(label,text){return '<div class="pg-block">'+(label?(label.indexOf('m:')===0?'<span class="am-label only-m-block">'+label.slice(2)+'</span>':'<span class="am-label">'+label+'</span>'):'')+'<p class="am-para__text">'+text+'</p></div>'}
function row(label,value,sub){return '<li><div class="am-row'+(sub?' pg-row2':'')+'"><span class="am-row__label">'+label+(sub?'<span class="am-caption">'+sub+'</span>':'')+'</span><span class="am-row__value">'+value+'</span></div></li>'}
function thumb(p){return '<span class="am-row__thumb">'+(p.img?'<img src="'+p.img+'" alt="">':'')+'</span>'}
function recent(p){return '<li><a class="am-row am-row--media" href="#/portfolio/'+p.slug+'"><span class="am-row__label">'+p.title+'<span class="am-caption">'+p.cat+' · '+p.date+'</span></span><span class="am-row__value">'+thumb(p)+ico('arrow-right')+'</span></a></li>'}
function link(cls,href,label,value,icon){return '<li><a class="am-row '+cls+'" href="'+href+'"'+(/^https?:/.test(href)?' target="_blank" rel="noopener"':'')+'><span class="am-row__label">'+label+'</span><span class="am-row__value">'+value+' '+ico(icon)+'</span></a></li>'}

/* ---------- Home ---------- */
function dm(d,m){return '<span class="only-d">'+d+'</span><span class="only-m">'+m+'</span>'}
function home(){
  setPath([['home','#/']]);
  view.innerHTML=hero(
    block('',dm('Ciao, sono un graphic designer: ad oggi studio Design della Comunicazione e lavoro come freelance. Aiuto persone e aziende a trasformare le loro idee in progetti grafici curati in ogni dettaglio.','Ciao, sono un graphic designer: studio Design della Comunicazione e lavoro come freelance, trasformando idee in progetti grafici curati.'))+
    block('',dm('Mi occupo principalmente di '+catLink('Branding','branding')+', '+catLink('Advertising','advertising')+', '+catLink('Packaging','packaging')+' e '+catLink('Web design','web design')+'. In ogni progetto seguo un metodo preciso: parto dal brief, studio il contesto e i riferimenti visivi, poi definisco una direzione creativa che dia al progetto il giusto carattere. Durante la realizzazione ti tengo aggiornato a ogni passaggio e, alla consegna, ricevi tutti i file del progetto, in piena trasparenza.','Mi occupo di '+catLink('Branding','branding')+', '+catLink('Advertising','advertising')+', '+catLink('Packaging','packaging')+' e '+catLink('Web design','web design')+', seguendo un metodo preciso: ricerca, scelta della direzione visiva e processo creativo.'))+
    '<hr class="pg-divider">'+
    block('m:Contatti',dm('Hai un’idea o un progetto da propormi? Scrivimi all’indirizzo <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a><button class="am-copy" type="button" aria-label="Copia indirizzo email" title="Copia" onclick="AndreaManzo.copy(this,\'ciao@andreamanzo.it\')">'+ico('copy')+'</button> oppure raggiungimi su <a class="am-textlink" href="https://www.instagram.com/andreamanzo.it/" target="_blank" rel="noopener">Instagram</a> e <a class="am-textlink" href="https://www.linkedin.com/in/andrea-manzo-2b4987187/" target="_blank" rel="noopener">LinkedIn</a>. Se vuoi saperne di più, apri la mia <a class="am-textlink" href="#" data-cv aria-haspopup="dialog">scheda contatto</a>.','Scrivimi a <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a><button class="am-copy" type="button" aria-label="Copia indirizzo email" title="Copia" onclick="AndreaManzo.copy(this,\'ciao@andreamanzo.it\')">'+ico('copy')+'</button> o su <a class="am-textlink" href="https://www.instagram.com/andreamanzo.it/" target="_blank" rel="noopener">Instagram</a> e <a class="am-textlink" href="https://www.linkedin.com/in/andrea-manzo-2b4987187/" target="_blank" rel="noopener">LinkedIn</a>. Per saperne di più apri la mia <a class="am-textlink" href="#" data-cv aria-haspopup="dialog">scheda contatto</a>.'))+
    '<hr class="pg-divider only-m-block"><div class="pg-block only-m-block"><span class="am-label">Portfolio</span><a class="am-row pg-cta-row" href="#/portfolio?f=tutti"><span class="am-row__label">Esplora tutti i progetti</span><span class="am-row__value">'+ico('arrow-right')+'</span></a></div>'+
    '<div class="pg-block only-d"><p class="am-para__text">'+'All’interno del sito troverai una selezione dei miei lavori, pensata per farti capire come lavoro e cosa posso realizzare per te. Ogni progetto racconta la storia e il processo che hanno portato al risultato finale. <a class="am-textlink" href="#/portfolio?f=tutti">Esplora tutti i miei progetti'+ico('arrow-right')+'</a>'+'</p></div>')+
  '<section class="am-section only-d"><span class="am-label">Ultimi progetti</span><ul class="am-list">'+PROJECTS.slice(0,3).map(recent).join('')+'</ul></section>';
}

/* ---------- Portfolio ---------- */
function filtered(){return PROJECTS.filter(function(p){return (state.filter==='Tutti'||p.cat===state.filter)&&p.title.toLowerCase().indexOf(state.q.toLowerCase())>-1})}
function portfolio(){
  setPath([['home','#/'],['portfolio','#/portfolio']]);
  var counts={Tutti:PROJECTS.length};CATS.forEach(function(c){counts[c]=PROJECTS.filter(function(p){return p.cat===c}).length});
  view.innerHTML=intro('Portfolio',block('',dm('Qui trovi una raccolta di progetti selezionati, reali o accademici. Tutti i contenuti di queste pagine sono protetti dal diritto d’autore, che esercito personalmente o che ho ceduto ai clienti.','Progetti selezionati, reali o accademici, protetti dal diritto d’autore.')+' <a class="am-textlink" href="#/privacy">Scopri di più</a>.'))+
  '<div class="am-toolbar"><div class="am-toolbar__tags">'+['Tutti'].concat(CATS).map(function(c){return '<button class="am-tag" data-f="'+c+'" aria-pressed="'+(state.filter===c)+'">'+c+'<span class="am-tag__count">'+counts[c]+'</span></button>'}).join('')+'</div>'+
  '<label class="am-search">'+ico('search')+'<input type="search" id="q" placeholder="Cerca un progetto" aria-label="Cerca un progetto" value="'+state.q+'"></label></div>'+
  '<div id="results" class="pg-results"></div>';
  view.querySelectorAll('[data-f]').forEach(function(b){b.onclick=function(){state.filter=b.dataset.f;state.page=0;portfolio()}});
  var q=$('#q');q.oninput=function(){state.q=q.value;state.page=0;results()};
  results();
}
/* quante righe di card entrano tra la toolbar e il footer */
function perPage(){
  var box=$('#results'); if(!box) return 3;
  var col=view.getBoundingClientRect(), top=box.getBoundingClientRect().top, bottom=main.getBoundingClientRect().bottom-parseFloat(getComputedStyle(view).paddingBottom);
  var w=view.clientWidth, cw=(w-2*12)/3, ch=cw*0.75+16*2+8*2+22+18; /* immagine 4:3 + padding + testi */
  var free=bottom-top-60; /* spazio per la paginazione */
  return 3*Math.max(1,Math.floor((free+12)/(ch+12)));
}
var SOON='<div class="am-project am-project--soon" role="note"><div class="am-project__media am-project__note"><p>Il portfolio è in allestimento: nuovi progetti verranno pubblicati nel corso del tempo.</p></div><div class="am-project__head"><h3 class="am-project__title">Prossimamente</h3></div><span class="am-caption">In allestimento</span></div>';
function results(){
  var list=filtered(), box=$('#results');
  if(!list.length){box.innerHTML='<div class="am-empty" role="status"><span class="am-label">0 risultati</span><p class="am-empty__title">Nessun progetto per “'+(state.q||state.filter)+'”.</p><p class="am-empty__text">Prova con un’altra parola o togli i filtri.</p><button class="am-link" type="button" id="reset">Mostra tutti i progetti '+ico('arrow-right')+'</button></div>';
    $('#reset').onclick=function(){state={filter:'Tutti',q:'',page:0};portfolio()};return;}
  box.innerHTML='<div class="am-grid am-grid--3 pg-grid" id="grid"></div><div class="am-pager" id="pager"></div>';
  var PER=perPage(), pages=Math.max(1,Math.ceil(list.length/PER)); if(state.page>=pages)state.page=pages-1;
  var slice=list.slice(state.page*PER,state.page*PER+PER);
  $('#grid').innerHTML=slice.map(card).join('')+(slice.length<3?SOON:'');
  $('#pager').innerHTML='<span>'+pad(state.page*PER+slice.length)+' di '+pad(list.length)+(list.length===1?' progetto':' progetti')+'</span><div class="am-pager__nav"><button class="am-pager__btn" id="prev" aria-label="Pagina precedente"'+(state.page?'':' disabled')+'>'+ico('arrow-left')+'</button><span class="am-pager__pages">'+pad(state.page+1)+' / '+pad(pages)+'</span><button class="am-pager__btn" id="next" aria-label="Pagina successiva"'+(state.page<pages-1?'':' disabled')+'>'+ico('arrow-right')+'</button></div>';
  $('#prev').onclick=function(){state.page--;results()};$('#next').onclick=function(){state.page++;results()};
}
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if($('#grid'))results()},120)});

/* ---------- Progetto ---------- */
function project(slug){
  var i=PROJECTS.findIndex(function(x){return x.slug===slug}); if(i<0) return notFound();
  var p=PROJECTS[i], prev=PROJECTS[(i-1+PROJECTS.length)%PROJECTS.length], next=PROJECTS[(i+1)%PROJECTS.length];
  setPath([['home','#/'],['portfolio','#/portfolio'],[p.slug,'']]);
  var imgs=[[4,3],[3,4],[4,3],[3,4],[4,3],[4,3]];
  view.innerHTML='<section class="pg-intro"><div class="pg-titlerow"><span class="am-label pg-date">'+p.date+'</span><h1 class="am-title">'+p.title+'</h1>'+
    '<nav class="pg-projnav" aria-label="Altri progetti">'+(PROJECTS.length>1?'<a class="am-pager__btn" href="#/portfolio/'+prev.slug+'" aria-label="Progetto precedente: '+prev.title+'">'+ico('arrow-left')+'</a>':'<button class="am-pager__btn" disabled aria-label="Nessun progetto precedente">'+ico('arrow-left')+'</button>')+'<span class="am-pager__pages">'+pad(p.n)+' / '+pad(PROJECTS.length)+'</span>'+(PROJECTS.length>1?'<a class="am-pager__btn" href="#/portfolio/'+next.slug+'" aria-label="Progetto successivo: '+next.title+'">'+ico('arrow-right')+'</a>':'<button class="am-pager__btn" disabled aria-label="Nessun progetto successivo">'+ico('arrow-right')+'</button>')+'</nav></div>'+
    block('Storia',LOREM+' Ut enim ad minim veniam, quis nostrud exercitation.')+block('Processo',LOREM+' Duis aute irure dolor in reprehenderit.')+'</section>'+
  '<ul class="am-list pg-meta">'+row('Tipo',p.tipo)+row('Cliente','Lorem ipsum')+row('Ambito',p.cat)+'<li><div class="am-row"><span class="am-row__label">Servizi</span><span class="pg-tags">'+SERV[p.cat].map(function(s){return '<span class="am-tag">'+s+'</span>'}).join('')+'</span></div></li></ul>'+
  '<div class="am-media"><button class="am-media__cover" data-open="0" aria-label="Apri la galleria dalla figura 1"><img src="'+ph(2400,1800)+'" alt=""></button><div class="am-media__thumbs"><button class="am-media__thumb" data-open="1" aria-label="Apri la figura 2"><img src="'+ph(1800,1800)+'" alt=""></button><button class="am-media__thumb" data-open="2" aria-label="Apri la figura 3"><img src="'+ph(1800,1800)+'" alt=""></button></div>'+
  '<span class="am-caption">FIG. 01 — Lorem ipsum</span><button class="am-link" type="button" data-open="0">Apri la galleria · '+pad(imgs.length)+' immagini '+ico('arrow-right')+'</button></div>';
  galFoot.querySelectorAll('.am-gallery__thumb').forEach(function(t){t.remove()});
  var cap=galFoot.querySelector('.am-gallery__caption');
  imgs.forEach(function(r,j){var s=ph(r[0]*600,r[1]*600);var b=document.createElement('button');b.className='am-gallery__thumb';b.dataset.src=s;b.dataset.caption='Lorem ipsum '+(j+1);b.setAttribute('aria-label','Immagine '+(j+1));b.innerHTML='<img src="'+s+'" alt="">';galFoot.insertBefore(b,cap)});
  $('#galTitle').innerHTML=p.title+' — <b>Galleria</b>';
  gallery=AndreaManzo.gallery($('#gallery'));
  view.querySelectorAll('[data-open]').forEach(function(b){b.onclick=function(){gallery.open(+b.dataset.open)}});
}

/* ---------- Contatto ---------- */
var TOOLS=['Adobe Illustrator','Adobe Photoshop','Framer','Figma','Claude'];

/* ---------- Privacy ---------- */
function privacy(){
  setPath([['home','#/'],['note-legali','#/privacy']]);
  view.innerHTML='<article class="am-prose pg-prose"><h1 class="am-title">Note legali</h1><span class="am-label">Ultimo aggiornamento — 13 ottobre 2026</span><p class="am-prose__lead">Questa pagina raccoglie le informazioni legali sul sito andreamanzo.it: chi ne è responsabile, come vengono trattati i dati di chi lo visita, come sono tutelati i contenuti pubblicati e come è stata usata l’intelligenza artificiale nei progetti.</p><h2>1. Titolare del sito</h2><p>Il sito andreamanzo.it è un portfolio personale che presenta il lavoro di graphic designer di Andrea Manzo.</p><ul><li>Titolare: Andrea Manzo</li><li>Sede: Napoli, Italia</li><li>Email: <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a></li><li>Partita IVA: in fase di apertura; verrà indicata in questa pagina appena attribuita.</li></ul><p>Il sito ha scopo informativo e di presentazione: non vende prodotti e non offre servizi a pagamento online. Eventuali incarichi vengono concordati direttamente, con accordi separati.</p><h2>2. Privacy: come vengono trattati i tuoi dati</h2><p>Questa informativa è resa ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003 (Codice in materia di protezione dei dati personali), come modificato dal D.Lgs. 101/2018.</p><h3>Titolare del trattamento</h3><p>Andrea Manzo, Napoli, Italia. Per ogni richiesta sulla privacy scrivi a <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a>.</p><h3>Dati di navigazione</h3><p>Quando visiti il sito, il servizio di hosting registra automaticamente alcuni dati tecnici, come indirizzo IP, tipo di browser, data e ora della richiesta e pagina visitata. Servono solo a far funzionare il sito e a proteggerlo da usi impropri. La base giuridica è il legittimo interesse del titolare (art. 6, par. 1, lett. f GDPR). Questi dati non vengono usati per identificarti né per profilarti, e restano nei log del fornitore per il tempo previsto dalle sue policy.</p><h3>Dati che mi invii volontariamente</h3><p>Il sito non ha moduli di contatto. Se mi scrivi all’indirizzo email indicato, tratterò il tuo indirizzo e i dati contenuti nel messaggio solo per risponderti ed eventualmente preparare un preventivo (art. 6, par. 1, lett. b GDPR). I messaggi vengono conservati per il tempo necessario a gestire la richiesta e, in caso di incarico, per quello previsto dagli obblighi di legge.</p><h3>Hosting e destinatari dei dati</h3><p>Il sito è pubblicato tramite GitHub Pages, servizio di GitHub, Inc. (San Francisco, Stati Uniti), che agisce come responsabile del trattamento per i dati tecnici di navigazione. Il trasferimento di questi dati negli Stati Uniti avviene con le garanzie previste dagli articoli 44 e seguenti del GDPR: GitHub aderisce all’EU‑US Data Privacy Framework e applica le clausole contrattuali standard della Commissione europea. Maggiori dettagli nella <a class="am-textlink am-textlink--ext" href="https://docs.github.com/it/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">informativa privacy di GitHub<svg class="am-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L17 7M9 6h9v9"/></svg></a>. I dati non vengono venduti né ceduti ad altri.</p><h3>Font</h3><p>I caratteri tipografici del sito (Inter Tight e JetBrains Mono) sono caricati direttamente dal sito stesso e non da servizi esterni: la loro visualizzazione non comporta alcun invio di dati a terzi.</p><h3>Link esterni</h3><p>Il sito contiene link ai profili Instagram e LinkedIn. Aprendoli lasci andreamanzo.it e si applicano le informative di quelle piattaforme. Il sito non incorpora pulsanti, widget o contenuti dei social network che raccolgano dati durante la visita.</p><h3>I tuoi diritti</h3><p>In qualsiasi momento puoi chiedere di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, opporti al trattamento o riceverli in un formato leggibile (articoli 15‑22 GDPR). Basta una email a <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a>. Hai anche il diritto di presentare reclamo al <a class="am-textlink am-textlink--ext" href="https://www.garanteprivacy.it" target="_blank" rel="noopener">Garante per la protezione dei dati personali<svg class="am-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L17 7M9 6h9v9"/></svg></a>.</p><h2>3. Cookie</h2><p>Il sito non usa cookie di profilazione, né cookie di analisi o di terze parti. Possono essere presenti solo cookie tecnici strettamente necessari al funzionamento, impostati dal servizio di hosting, per i quali non serve il consenso (art. 122 del Codice privacy e Linee guida del Garante sui cookie del 10 giugno 2021). Per questo motivo il sito non mostra un banner dei cookie. La scelta del tema chiaro o scuro non viene salvata: a ogni visita il sito riparte dal tema scuro.</p><h2>4. Diritto d’autore sui contenuti del sito</h2><p>Testi, progetti grafici, immagini, impaginazione e codice di questo sito sono opere protette dalla Legge 22 aprile 1941, n. 633 sul diritto d’autore e dalle norme europee in materia, tra cui la Direttiva (UE) 2019/790, recepita con il D.Lgs. 177/2021. Salvo dove indicato diversamente, i diritti appartengono ad Andrea Manzo.</p><p>Non è consentito copiare, riprodurre, modificare, distribuire o usare a fini commerciali i contenuti del sito, interamente o in parte, senza autorizzazione scritta. Sono consentite la semplice consultazione e la condivisione del link alle pagine. È consentita anche la citazione di brevi parti per fini di critica, discussione o insegnamento, con l’indicazione dell’autore e della fonte (art. 70 L. 633/1941).</p><p>Ai sensi dell’art. 70‑quater L. 633/1941, mi riservo espressamente i diritti di estrazione di testo e dati (text and data mining) sui contenuti del sito, anche per l’addestramento di sistemi di intelligenza artificiale.</p><h2>5. Progetti per clienti e progetti accademici</h2><p>Il <a class="am-textlink" href="#/portfolio?f=tutti">portfolio</a> raccoglie due tipi di lavori:</p><ul><li><strong>Progetti per clienti reali.</strong> I diritti di utilizzazione economica sono stati ceduti al cliente secondo l’accordo stipulato. Marchi, nomi e loghi appartengono ai rispettivi titolari. Il lavoro è pubblicato solo come esempio del mio percorso professionale, come previsto dagli accordi con i clienti. La pubblicazione non implica alcuna sponsorizzazione o approvazione da parte del cliente.</li><li><strong>Progetti accademici o di studio.</strong> Sono esercitazioni personali o realizzate durante il percorso di formazione. Possono rappresentare marchi, aziende o luoghi esistenti, oppure inventati: in questi casi il progetto non è stato commissionato né approvato dai soggetti rappresentati, e ogni marchio citato appartiene ai rispettivi titolari.</li></ul><p>Ogni progetto indica se si tratta di un lavoro per un cliente o di un progetto accademico.</p><h2>6. Contenuti di terzi</h2><p>Alcuni progetti contengono materiali creati da altre persone o aziende: caratteri tipografici, fotografie, mockup, illustrazioni e grafiche vettoriali. Sono stati usati nel rispetto della normativa sul diritto d’autore e delle relative licenze: si tratta di risorse a libero utilizzo, come le licenze aperte o i contenuti di pubblico dominio, oppure di risorse con licenza regolarmente acquistata. I font usati all’interno delle immagini sono impiegati secondo le loro licenze, che ne consentono l’uso in immagini e documenti statici.</p><p>I diritti su questi materiali restano dei rispettivi autori. Se ritieni che un contenuto pubblicato violi un tuo diritto, scrivimi a <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a> indicando il contenuto e il motivo: verificherò la segnalazione e, se fondata, lo rimuoverò o correggerò i crediti nel più breve tempo possibile.</p><h2>7. Uso dell’intelligenza artificiale</h2><p>In alcuni progetti ho usato strumenti di intelligenza artificiale come supporto, non come sostituto del lavoro creativo. In particolare per:</p><ul><li>scrivere brief fittizi per i progetti accademici, con Claude (Anthropic);</li><li>creare mockup e le immagini usate al loro interno, cioè ambienti, oggetti e scene in cui il progetto viene mostrato, con Nano Banana Pro (Google) o con modelli open source tramite ComfyUI.</li></ul><p>Ideazione, scelte progettuali, identità visive, impaginazione e grafiche presentate sono frutto del mio lavoro. In linea con gli obblighi di trasparenza del Regolamento (UE) 2024/1689 (AI Act) e con la Legge 23 settembre 2025, n. 132, segnalo nei singoli progetti quando un’immagine è stata generata o modificata con l’intelligenza artificiale. Le immagini generate non rappresentano persone, luoghi o fatti reali, salvo dove indicato.</p><h2>8. Limitazione di responsabilità</h2><p>I contenuti del sito sono curati con attenzione, ma possono contenere imprecisioni o non essere aggiornati. Il titolare non è responsabile dell’uso che terzi fanno delle informazioni pubblicate, né dei contenuti dei siti esterni raggiungibili tramite link, sui quali non ha alcun controllo.</p><h2>9. Legge applicabile e modifiche</h2><p>Queste note legali sono regolate dalla legge italiana. Possono essere aggiornate quando cambiano il sito, i servizi usati o la normativa; la data dell’ultimo aggiornamento è indicata in cima alla pagina. Per qualsiasi domanda scrivi a <a class="am-textlink" href="mailto:ciao@andreamanzo.it">ciao@andreamanzo.it</a>.</p></article>';
}

/* ---------- 404 ---------- */
function notFound(){
  setPath([['404','']]);
  view.innerHTML=intro('Questa pagina non esiste o è stata spostata','<div class="pg-block"><span class="am-code">Errore 404</span><p class="am-para__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div class="pg-actions"><a class="am-btn am-btn--primary" href="#/">Torna alla Home '+ico('arrow-right')+'</a><a class="am-link" href="#/portfolio">Vedi i progetti '+ico('arrow-right')+'</a></div>');
}

function route(){
  var hq=(window.__HASH!=null?window.__HASH:location.hash).replace(/^#\/?/,'').split('?'), h=hq[0].split('/'), f=(hq[1]||'').match(/(?:^|&)f=([^&]+)/);
  if(h[0]==='portfolio'&&!h[1]&&f){var c=['Tutti'].concat(CATS).filter(function(x){return slugc(x)===f[1]})[0];if(c)state={filter:c,q:'',page:0};}
  if(!h[0]) home(); else if(h[0]==='portfolio'&&h[1]) project(h[1]); else if(h[0]==='portfolio') portfolio(); else if(h[0]==='privacy') privacy(); else notFound();
  main.scrollTop=0;
}
window.addEventListener('hashchange',route);
/* Anteprima (iframe): navigazione interna senza cambiare l'indirizzo */
if(window.__PREVIEW){window.__HASH='#/';document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a||a.hasAttribute('data-cv'))return;e.preventDefault();window.__HASH=a.getAttribute('href');if(window.cvClose)cvClose();route()},true)}
document.addEventListener('keydown',function(e){if(e.key==='/'&&$('#q')&&document.activeElement!==$('#q')){e.preventDefault();$('#q').focus()}});
AndreaManzo.syncThemeButtons(); route();
/* ---------- Scheda contatto (CV) ---------- */
var cv=AndreaManzo.sheet($('#cv'));
$('#cvBody').innerHTML=
  '<div class="pg-hero"><span class="am-avatar"><img src="assets/img/immagine-profilo.jpg" alt="Immagine profilo di Andrea Manzo"></span><div class="pg-hero__txt"><span class="am-para__title">Andrea Manzo</span><span class="am-label">Graphic designer</span></div></div>'+
  '<section><span class="am-label">Situazione attuale</span><p class="am-para__text">Studente di Design della Comunicazione e graphic designer freelance. Disponibile per nuovi progetti e collaborazioni con agenzie.</p></section>'+
  '<section><span class="am-label">Informazioni</span><ul class="am-list">'+row('Luogo','Napoli, Italia')+row('Email','ciao@andreamanzo.it')+'</ul></section>'+
  '<section><span class="am-label">Istruzione</span><ul class="am-list">'+row('Tecnico Esperto di Grafica Informatica','2026 – in corso','ILAS Academy')+row('Perito Tecnico in Grafica e Comunicazione','2013 – 2019','I.I.S. Don Geremia Piscopo')+'</ul></section>'+
  '<section><span class="am-label">Esperienza</span><ul class="am-list">'+row('Graphic designer freelance','Dal 2024','Branding, advertising, packaging, web design')+'</ul></section>'+
  '<section><span class="am-label">Competenze</span><ul class="am-list">'+row('Branding e identità visiva','')+row('Advertising','')+row('Packaging','')+row('Web design','')+'</ul></section>'+
  '<section><span class="am-label">Strumenti</span><ul class="am-list">'+TOOLS.map(function(t){return row(t,'')}).join('')+'</ul></section>'+
  '<section><span class="am-label">Lingue</span><ul class="am-list">'+row('Italiano','Madrelingua')+row('Inglese','B2')+'</ul></section>';
window.addEventListener('hashchange',function(){cv.close()});
window.cvClose=function(){cv.close()};
document.addEventListener('click',function(e){var t=e.target.closest('[data-cv]');if(t){e.preventDefault();cv.open()}});

})();
