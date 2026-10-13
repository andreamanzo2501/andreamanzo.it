window.AndreaManzo = {
  /* Icone: contenuto SVG su griglia 24×24, tratto 1.5px. Uso: <svg class="am-ico" viewBox="0 0 24 24">…</svg> */
  /* Scheda: AndreaManzo.sheet(el) apre/chiude una finestra modale (.am-sheet): sfondo scurito, Esc, clic fuori, focus intrappolato. */
  sheet: function (el) {
    var trap = AndreaManzo.trap(el.querySelector('.am-sheet__panel'));
    var api = {
      open: function () { el.setAttribute('data-open', ''); document.documentElement.style.overflow = 'hidden'; trap.on(el.querySelector('[data-sheet-close]')); },
      close: function () { if (!el.hasAttribute('data-open')) return; el.removeAttribute('data-open'); document.documentElement.style.overflow = ''; trap.off(); }
    };
    el.querySelectorAll('[data-sheet-close]').forEach(function (b) { b.onclick = api.close; });
    el.addEventListener('mousedown', function (e) { if (e.target === el) api.close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') api.close(); });
    return api;
  },
  copy: function (btn, text) {
    var svg = function (n) { return '<svg class="am-ico am-ico--16" viewBox="0 0 24 24" aria-hidden="true">' + AndreaManzo.icons[n] + '</svg>'; };
    var done = function () {
      var lab = btn.getAttribute('aria-label');
      btn.innerHTML = svg('check'); btn.setAttribute('aria-label', 'Copiato'); btn.setAttribute('data-done', '');
      clearTimeout(btn._t); btn._t = setTimeout(function () { btn.innerHTML = svg('copy'); btn.setAttribute('aria-label', lab); btn.removeAttribute('data-done'); }, 1600);
    };
    var fallback = function () { var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} t.remove(); done(); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  },
  icons: {"arrow-right": "<path d=\"M4 12h14M13 6l6 6-6 6\"/>", "arrow-left": "<path d=\"M20 12H6M11 6l-6 6 6 6\"/>", "arrow-up-right": "<path d=\"M6 18L17 7M9 6h9v9\"/>", "download": "<path d=\"M12 3v12M6 10l6 6 6-6M4 20h16\"/>", "search": "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.5 15.5L20 20\"/>", "moon": "<path d=\"M12 4A8 8 0 1 0 20 12A6 6 0 1 1 12 4Z\" stroke-linejoin=\"bevel\" fill=\"currentColor\"/>", "close": "<path d=\"M6 6l12 12M18 6L6 18\"/>", "copy": "<path d=\"M9 9h11v11H9zM15 9V4H4v11h5\"/>", "check": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>", "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"currentColor\"/><path d=\"M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41\"/>"},
  /* Pannelli sovrapposti (menu, galleria): blocca il Tab dentro il pannello e, alla chiusura, riporta il focus a chi l'ha aperto. */
  trap: function (panel) {
    var back = null;
    function onKey(e) {
      if (e.key !== 'Tab') return;
      var f = panel.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    return {
      on: function (focusEl) { back = document.activeElement; panel.addEventListener('keydown', onKey); if (focusEl) focusEl.focus(); },
      off: function () { panel.removeEventListener('keydown', onKey); if (back && back.focus) back.focus(); back = null; }
    };
  },
  /* Cambia tema scuro (default) / chiaro su <html data-theme>, aggiorna i pulsanti .am-theme e ricorda la scelta. */
  toggleTheme: function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    AndreaManzo.syncThemeButtons();
    return next;
  },
  /* Galleria: AndreaManzo.gallery(el) collega frecce, miniature, Chiudi e tastiera (← → Esc). Gli elementi sono le .am-gallery__thumb con data-src e data-caption. */
  gallery: function (el) {
    var thumbs = el.querySelectorAll('.am-gallery__thumb'), img = el.querySelector('.am-gallery__img'),
        cap = el.querySelector('.am-gallery__caption'), i = 0, n = thumbs.length;
    function pad(x) { return (x < 10 ? '0' : '') + x; }
    function show(k) {
      i = (k + n) % n; var t = thumbs[i];
      img.src = t.getAttribute('data-src'); img.alt = t.getAttribute('data-caption') || '';
      cap.textContent = 'FIG. ' + pad(i + 1) + ' / ' + pad(n) + ' \u2014 ' + (t.getAttribute('data-caption') || '');
      for (var j = 0; j < n; j++) thumbs[j].setAttribute('aria-current', j === i ? 'true' : 'false');
    }
    for (var j = 0; j < n; j++) (function (j) { thumbs[j].onclick = function () { show(j); }; })(j);
    el.querySelector('[data-prev]').onclick = function () { show(i - 1); };
    el.querySelector('[data-next]').onclick = function () { show(i + 1); };
    var close = el.querySelector('.am-gallery__close'), trap = AndreaManzo.trap(el);
    var api = {
      open: function (k) { el.setAttribute('data-open', ''); show(k || 0); trap.on(close); },
      close: function () { if (!el.hasAttribute('data-open')) return; el.removeAttribute('data-open'); trap.off(); },
      show: show
    };
    close.onclick = api.close;
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(i - 1); else if (e.key === 'ArrowRight') show(i + 1); else if (e.key === 'Escape') api.close();
    });
    if (n) show(0);
    return api;
  },
  syncThemeButtons: function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var btns = document.querySelectorAll('.am-theme');
    for (var i = 0; i < btns.length; i++) {
      btns[i].innerHTML = '<svg class="am-ico am-ico--16" viewBox="0 0 24 24" aria-hidden="true">' + (dark ? AndreaManzo.icons.sun : AndreaManzo.icons.moon) + '</svg>';
      btns[i].setAttribute('aria-label', dark ? 'Passa al tema chiaro' : 'Passa al tema scuro');
    }
  }
};
