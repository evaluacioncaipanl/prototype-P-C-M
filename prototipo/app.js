/* =====================================================================
   LÓGICA DEL PROTOTIPO
   Reglas tomadas de la hoja DECISIONES: módulos en orden, lecciones en
   orden, reflexión + evaluación por módulo, 85 mínimo, 2 intentos,
   tercer intento tras reunión por Zoom, respuestas solo al aprobar.
   ===================================================================== */
(function () {
  'use strict';

  var CLAVE = 'caipa-prototipo-v1';
  var app = document.getElementById('app');

  /* ---------------- Íconos (trazos de 24×24) ---------------- */
  var IC = {
    inicio: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    cerrar: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    play: '<path d="M7 4v16l13-8z" fill="currentColor" stroke="none"/>',
    candado: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    izq: '<path d="m15 18-6-6 6-6"/>',
    der: '<path d="m9 18 6-6-6-6"/>',
    salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    diana: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    estrella: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    constancia: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    reflexion: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    examen: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    reiniciar: '<path d="M1 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10"/>',
    balanza: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
    persona: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>',
    capas: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    flujo: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/>',
    grupo: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    corazon: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    birrete: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    brujula: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    documento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'
  };
  function ic(n, size, extra) {
    return '<svg class="ic ' + (extra || '') + '" width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || '') + '</svg>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- Estado ---------------- */
  function vacio() { return { l: [0, 0, 0, 0], r: [false, false, false, false], e: [false, false, false, false], fin: false, att: {}, allow: {}, cal: {}, fecha: null }; }
  var PRESETS = {
    'Sin iniciar': vacio,
    'Módulo 2 en curso': function () { var p = vacio(); p.l = [3, 2, 0, 0]; p.r[0] = true; p.e[0] = true; return p; },
    'General completa': function () { return { l: [3, 4, 5, 3], r: [true, true, true, true], e: [true, true, true, true], fin: true, att: { '0': 1 }, allow: {}, cal: { '0': 100 }, fecha: new Date().toISOString() }; }
  };
  function nuevo(preset) {
    return { view: 'home', prog: PRESETS[preset || 'Sin iniciar'](), pos: { m: 0, l: 0, s: 0 }, tl: { sel: 0, vistos: [0], filtro: 'Todos' }, evalModo: 'Por módulo', areasModo: 'Solo su área', demo: true };
  }
  var S;
  try { S = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { S = null; }
  if (!S || !S.prog) S = nuevo();
  var menuAbierto = window.innerWidth >= 1024;

  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(S)); } catch (e) {} }
  function set(cambios, subir) {
    Object.assign(S, cambios); guardar(); render();
    if (subir) { window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); if (window.innerWidth < 1024) menuAbierto = false; }
  }
  function copia(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------------- Reglas ---------------- */
  var NM = MODULOS.length;
  function porModulo() { return S.evalModo !== 'Al final de la capacitación'; }
  function nL(i) { return MODULOS[i].lecciones.length; }
  function llevaEval(i) { return porModulo() && MODULOS[i].banco.length > 0; }
  function modListo(p, i) { return p.l[i] >= nL(i) && p.r[i] && (!llevaEval(i) || p.e[i]); }
  function calc() {
    var p = S.prog, cur = -1;
    for (var i = 0; i < NM; i++) if (!modListo(p, i)) { cur = i; break; }
    var todos = cur === -1;
    var general = todos && (porModulo() || p.fin);
    return { cur: cur, general: general, finalPendiente: todos && !general };
  }
  function bancoDe(sc) {
    if (sc === 'F') { var a = []; MODULOS.forEach(function (m) { a = a.concat(m.banco); }); return a; }
    return MODULOS[sc].banco;
  }
  function usados(sc) { return S.prog.att[String(sc)] || 0; }
  function permitidos(sc) { return S.prog.allow[String(sc)] || AJUSTES.intentos; }
  function aprobado(sc) { return sc === 'F' ? S.prog.fin : S.prog.e[sc]; }
  function bloqueado(sc) { return !aprobado(sc) && usados(sc) >= permitidos(sc); }
  function nombreEval(sc) { return sc === 'F' ? 'Evaluación final de la capacitación general' : 'Evaluación del Módulo ' + (sc + 1); }

  /* ---------------- Navegación ---------------- */
  var A = {
    inicio: function () { set({ view: 'home' }, true); },
    menu: function () { menuAbierto = !menuAbierto; render(); },
    leccion: function (d, p) { set({ view: 'lesson', pos: { m: +d.m, l: +d.l, s: 0 }, prog: p || S.prog }, true); },
    reflexion: function (d, p) { set({ view: 'reflect', rm: +d.m, rAns: ['', '', ''], rErr: false, prog: p || S.prog }, true); },
    evalIntro: function (d, p) { set({ view: 'evalIntro', scope: d.m === 'F' ? 'F' : +d.m, prog: p || S.prog }, true); },
    modListo: function (d, p) { set({ view: 'modDone', dm: +d.m, prog: p || S.prog }, true); },
    continuar: function (d) {
      var m = +d.m, p = S.prog;
      if (p.l[m] < nL(m)) return A.leccion({ m: m, l: p.l[m] });
      if (!p.r[m]) return A.reflexion({ m: m });
      if (llevaEval(m) && !p.e[m]) return A.evalIntro({ m: m });
      A.leccion({ m: m, l: 0 });
    },
    pant: function (d) { set({ pos: { m: S.pos.m, l: S.pos.l, s: +d.s } }, true); },
    terminarLeccion: function () {
      var m = S.pos.m, l = S.pos.l, p = copia(S.prog), antes = modListo(S.prog, m);
      if (l === p.l[m]) p.l[m] = l + 1;
      if (l + 1 < nL(m) && l + 1 <= p.l[m]) return A.leccion({ m: m, l: l + 1 }, p);
      if (p.l[m] >= nL(m) && !p.r[m]) return A.reflexion({ m: m }, p);
      if (llevaEval(m) && !p.e[m]) return A.evalIntro({ m: m }, p);
      if (!antes && modListo(p, m)) return A.modListo({ m: m }, p);
      set({ view: 'home', prog: p }, true);
    },
    hito: function (d) {
      var k = +d.k, v = S.tl.vistos.indexOf(k) >= 0 ? S.tl.vistos : S.tl.vistos.concat([k]);
      S.tl = Object.assign({}, S.tl, { sel: k, vistos: v }); guardar(); render();
      var nodo = document.querySelector('.tl-nodo[data-k="' + k + '"]');
      if (nodo) { nodo.focus({ preventScroll: true }); nodo.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }
    },
    filtro: function (d) {
      var f = d.f, vis = visibles(f);
      var sel = vis.indexOf(S.tl.sel) >= 0 ? S.tl.sel : vis[0];
      S.tl = Object.assign({}, S.tl, { filtro: f }); guardar();
      A.hito({ k: sel });
    },
    enviarReflexion: function () {
      var m = S.rm, qs = MODULOS[m].reflexion;
      var ok = qs.every(function (q, k) { return (S.rAns[k] || '').trim().length > 0; });
      if (!ok) return set({ rErr: true });
      var p = copia(S.prog); p.r[m] = true;
      if (llevaEval(m) && !p.e[m]) return A.evalIntro({ m: m }, p);
      A.modListo({ m: m }, p);
    },
    empezarEval: function () {
      var sc = S.scope, b = bancoDe(sc), idx = b.map(function (_, i) { return i; });
      for (var j = idx.length - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)); var t = idx[j]; idx[j] = idx[r]; idx[r] = t; }
      set({ view: 'eval', ev: { qs: idx.slice(0, Math.min(AJUSTES.preguntasPorIntento, b.length)), ans: {}, i: 0 }, evErr: false }, true);
    },
    opcion: function (d) {
      var ev = copia(S.ev); ev.ans[d.q] = +d.o;
      set({ ev: ev, evErr: false });
    },
    irPregunta: function (d) { var ev = copia(S.ev); ev.i = +d.i; set({ ev: ev }); },
    enviarEval: function () {
      var sc = S.scope, B = bancoDe(sc), E = S.ev, n = Object.keys(E.ans).length;
      if (n < E.qs.length) {
        var falta = 0; while (E.ans[falta] !== undefined) falta++;
        var ev = copia(E); ev.i = falta; return set({ evErr: true, ev: ev });
      }
      var c = 0; E.qs.forEach(function (bi, qi) { if (E.ans[qi] === B[bi].ans) c++; });
      var score = Math.round(c / E.qs.length * 100), pasa = score >= AJUSTES.minimoAprobatorio;
      var p = copia(S.prog), k = String(sc);
      p.att[k] = (p.att[k] || 0) + 1;
      if (pasa) {
        if (sc === 'F') p.fin = true; else p.e[sc] = true;
        p.cal = p.cal || {}; p.cal[k] = score; p.fecha = new Date().toISOString();
      }
      set({ view: 'evalResult', res: { qs: E.qs, ans: E.ans, score: score, pass: pasa, correct: c }, prog: p }, true);
    },
    resultadoContinuar: function () { if (S.scope === 'F') return A.inicio(); A.modListo({ m: S.scope }); },
    repasarModulo: function () { A.leccion({ m: S.scope === 'F' ? 0 : S.scope, l: 0 }); },
    aviso: function (d) { aviso(d.t); },
    constancia: function () { set({ view: 'constancia' }, true); },
    imprimir: function () { window.print(); },
    /* Controles de demostración */
    demoPreset: function (d) { var n = nuevo(d.p); n.evalModo = S.evalModo; n.areasModo = S.areasModo; S = n; guardar(); render(); window.scrollTo(0, 0); },
    demoEval: function (d) { set({ evalModo: d.v, view: 'home' }); },
    demoAreas: function (d) { set({ areasModo: d.v }); },
    demoTercer: function () { var p = copia(S.prog); p.allow[String(S.scope)] = 3; set({ prog: p, view: 'evalIntro' }, true); },
    demoOcultar: function () { set({ demo: !S.demo }); }
  };

  function visibles(f) {
    var out = [];
    LINEA.forEach(function (h, k) { if (f === 'Todos' || h.ambito === f) out.push(k); });
    return out;
  }

  var avisoT;
  function aviso(t) {
    var el = document.getElementById('aviso');
    el.textContent = t; el.classList.add('on');
    clearTimeout(avisoT); avisoT = setTimeout(function () { el.classList.remove('on'); }, 3200);
  }

  /* ---------------- Vistas ---------------- */
  function chip(txt, tipo) { return '<span class="chip chip-' + tipo + '">' + txt + '</span>'; }
  function barra(pct, color) { return '<div class="barra"><div style="width:' + pct + '%;' + (color ? 'background:' + color : '') + '"></div></div>'; }
  function anillo(pct, centro, color, tam) {
    tam = tam || 132;
    return '<div class="anillo" style="--p:' + pct + ';--c:' + (color || 'var(--naranja-600)') + ';width:' + tam + 'px;height:' + tam + 'px">' + centro + '</div>';
  }

  function demoBar() {
    if (!S.demo) return '<button class="demo-mini" data-a="demoOcultar">Controles de demostración</button>';
    var bl = (S.view === 'evalIntro' || S.view === 'evalResult') && bloqueado(S.scope);
    function sel(nombre, accion, opciones, actual) {
      return '<label class="demo-sel">' + nombre + ' <select data-ch="' + accion + '">' + opciones.map(function (o) { return '<option' + (o === actual ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></label>';
    }
    return '<div class="demo" role="region" aria-label="Controles de demostración">' +
      '<span class="demo-t">Demostración · no forma parte de la plataforma</span>' +
      '<div class="demo-c">' +
      sel('Avance', 'demoPreset', Object.keys(PRESETS), '') +
      sel('Evaluación', 'demoEval', ['Por módulo', 'Al final de la capacitación'], S.evalModo) +
      sel('Áreas', 'demoAreas', ['Solo su área', 'Todas, las ajenas bloqueadas'], S.areasModo) +
      (bl ? '<button data-a="demoTercer">Habilitar tercer intento</button>' : '') +
      '<button data-a="demoPreset" data-p="Sin iniciar">' + ic('reiniciar', 16) + ' Reiniciar</button>' +
      '<button data-a="demoOcultar" aria-label="Ocultar controles">' + ic('cerrar', 16) + '</button>' +
      '</div></div>';
  }

  function encabezado() {
    var ini = USUARIO.nombre.split(' ').map(function (x) { return x[0]; }).slice(0, 2).join('');
    return '<header class="top">' +
      '<button class="icon-btn" data-a="menu" aria-label="Mostrar u ocultar menú" aria-expanded="' + menuAbierto + '">' + ic('menu', 26) + '</button>' +
      '<div class="logo" aria-label="Logotipo institucional">' +
        '<span class="logo-slot">LOGO</span>' +
        '<span class="logo-txt"><b>Capacitación CAIPA</b><small>Centro de Atención Integral para Adolescentes</small></span>' +
      '</div>' +
      '<div class="usuario"><span class="avatar">' + esc(ini) + '</span><span class="u-nom">' + esc(USUARIO.nombre) + '</span></div>' +
      '</header>';
  }

  function navLateral(c) {
    var p = S.prog, em = 0, v = S.view;
    if (v === 'home') em = c.cur >= 0 ? c.cur : -1;
    else if (v === 'lesson') em = S.pos.m;
    else if (v === 'reflect') em = S.rm;
    else if (v === 'modDone') em = S.dm;
    else if (typeof S.scope === 'number') em = S.scope;
    else em = -1;

    function item(t, hecho, disp, viendo, attrs) {
      var cls = 'n-item' + (hecho ? ' hecho' : '') + (viendo ? ' viendo' : '') + (disp ? '' : ' off');
      return '<button class="' + cls + '" ' + (disp ? attrs : 'disabled') + '><span class="n-dot">' + (hecho ? ic('check', 10) : '') + '</span><span>' + esc(t) + '</span></button>';
    }
    var mods = MODULOS.map(function (m, i) {
      var listo = modListo(p, i), actual = i === c.cur, bloq = !listo && !actual, acc = !bloq;
      var estado = listo ? '<span class="n-est ok">' + ic('check', 14) + '</span>' : actual ? '<span class="n-est cur" style="background:' + m.color + '"></span>' : '<span class="n-est">' + ic('candado', 14) + '</span>';
      var html = '<div class="n-mod' + (bloq ? ' bloq' : '') + '">' +
        '<button class="n-mod-t" ' + (acc ? 'data-a="continuar" data-m="' + i + '"' : 'disabled') + '>' + estado + '<span><small>Módulo ' + (i + 1) + '</small>' + esc(m.corto) + '</span></button>';
      if (i === em && acc) {
        html += '<div class="n-sub">';
        m.lecciones.forEach(function (ls, j) {
          html += item((i + 1) + '.' + (j + 1) + ' ' + ls.titulo, j < p.l[i], j <= p.l[i] && j < nL(i), v === 'lesson' && S.pos.m === i && S.pos.l === j, 'data-a="leccion" data-m="' + i + '" data-l="' + j + '"');
        });
        html += item('Actividad de reflexión', p.r[i], p.l[i] >= nL(i), v === 'reflect' && S.rm === i, 'data-a="reflexion" data-m="' + i + '"');
        if (llevaEval(i)) html += item('Evaluación del módulo', p.e[i], p.r[i], /^eval/.test(v) && S.scope === i, 'data-a="evalIntro" data-m="' + i + '"');
        html += '</div>';
      }
      return html + '</div>';
    }).join('');

    return '<nav class="lateral' + (menuAbierto ? ' abierto' : '') + '" aria-label="Menú de la capacitación">' +
      '<button class="n-home' + (v === 'home' ? ' viendo' : '') + '" data-a="inicio">' + ic('inicio') + ' Inicio</button>' +
      '<p class="n-cap">Capacitación general</p>' + mods +
      '<p class="n-cap">Módulo de tu área</p>' +
      '<div class="n-mod' + (c.general ? '' : ' bloq') + '"><div class="n-mod-t">' + (c.general ? '<span class="n-est cur"></span>' : '<span class="n-est">' + ic('candado', 14) + '</span>') + '<span>' + esc(USUARIO.area) + '</span></div></div>' +
      (c.general ? '<button class="n-home' + (v === 'constancia' ? ' viendo' : '') + '" data-a="constancia">' + ic('constancia') + ' Mi constancia</button>' : '') +
      '<div class="n-pie">' +
        '<button class="n-link" data-a="aviso" data-t="Mi perfil: nombre, área, centro y constancias (pendiente de diseñar).">' + ic('perfil') + ' Mi perfil</button>' +
        '<button class="n-link" data-a="aviso" data-t="En la versión real, aquí se cierra la sesión.">' + ic('salir') + ' Cerrar sesión</button>' +
      '</div></nav>' +
      '<div class="velo" data-a="menu"></div>';
  }

  /* ------- Inicio ------- */
  function vistaInicio(c) {
    var p = S.prog, totalL = 0, hechasL = 0;
    MODULOS.forEach(function (m, i) { totalL += nL(i); hechasL += Math.min(p.l[i], nL(i)); });
    var pctG = Math.round(hechasL / totalL * 100);
    var nombre = USUARIO.nombre.split(' ')[0];

    /* Tarjeta principal: qué sigue */
    var sigue;
    if (c.general) {
      sigue = '<div class="sigue ok">' + anillo(100, ic('check', 44), 'var(--verde)', 112) +
        '<div class="sigue-c"><span class="eyebrow">Capacitación general concluida</span><h2>¡Ya puedes iniciar el módulo de ' + esc(USUARIO.area) + '!</h2>' +
        '<p>Puedes volver a repasar cualquier lección cuando quieras.</p>' +
        '<div class="btns"><button class="btn" data-a="aviso" data-t="El módulo de área está en preparación.">Iniciar módulo de área</button>' +
        '<button class="btn sec" data-a="constancia">' + ic('constancia', 18) + ' Descargar constancia</button></div></div></div>';
    } else if (c.finalPendiente) {
      sigue = '<div class="sigue">' + anillo(100, '<b>Final</b>', null, 112) +
        '<div class="sigue-c"><span class="eyebrow">Siguiente paso</span><h2>Evaluación final de la capacitación general</h2>' +
        '<p>Concluiste los 4 módulos. Presenta la evaluación final para obtener tu constancia.</p>' +
        '<div class="btns"><button class="btn" data-a="evalIntro" data-m="F">Presentar evaluación</button></div></div></div>';
    } else {
      var i = c.cur, m = MODULOS[i], d = Math.min(p.l[i], nL(i)), pct = Math.round(d / nL(i) * 100);
      var siguiente = d < nL(i) ? 'Lección ' + (i + 1) + '.' + (d + 1) + ' · ' + m.lecciones[d].titulo : !p.r[i] ? 'Actividad de reflexión' : 'Evaluación del módulo';
      var inicio = d === 0 && !p.r[i];
      sigue = '<div class="sigue" style="--mc:' + m.color + '">' + anillo(pct, '<small>Módulo</small><b>' + (i + 1) + '</b>', m.color, 112) +
        '<div class="sigue-c"><span class="eyebrow">' + (inicio ? 'Comienza aquí' : 'Continúa donde te quedaste') + '</span>' +
        '<h2>' + esc(m.titulo) + '</h2>' +
        '<p class="sigue-next">' + ic('play', 14) + ' ' + esc(siguiente) + '</p>' +
        '<div class="btns"><button class="btn" data-a="continuar" data-m="' + i + '">' + (inicio ? 'Iniciar' : 'Continuar') + ' módulo ' + (i + 1) + ' ' + ic('der', 18) + '</button>' +
        '<span class="muted">' + d + ' de ' + nL(i) + ' lecciones</span></div></div></div>';
    }

    /* Ruta de módulos */
    var pasos = MODULOS.map(function (m, i) {
      var listo = modListo(p, i), actual = i === c.cur;
      return '<li class="paso' + (listo ? ' listo' : actual ? ' actual' : '') + '" style="--mc:' + m.color + '"><span>' + (listo ? ic('check', 14) : i + 1) + '</span></li>';
    }).join('') + '<li class="paso' + (c.general ? ' actual' : '') + '"><span>' + ic('estrella', 14) + '</span></li>' +
      '<li class="paso' + (c.general ? ' listo' : '') + '"><span>' + ic('constancia', 14) + '</span></li>';

    var tarjetas = MODULOS.map(function (m, i) {
      var listo = modListo(p, i), actual = i === c.cur, bloq = !listo && !actual;
      var d = Math.min(p.l[i], nL(i)), pct = Math.round(d / nL(i) * 100);
      var est = listo ? chip('Completado', 'ok') : actual ? chip('En curso', 'cur') : chip(ic('candado', 12) + ' Bloqueado', 'off');
      var sub = '';
      if (actual && d >= nL(i)) sub = '<p class="sub">' + (!p.r[i] ? 'Falta la actividad de reflexión' : 'Falta la evaluación del módulo') + '</p>';
      var accion = actual ? '<button class="btn full" data-a="continuar" data-m="' + i + '">' + (d === 0 && !p.r[i] ? 'Iniciar' : 'Continuar') + '</button>'
        : listo ? '<button class="btn sec full" data-a="leccion" data-m="' + i + '" data-l="0">Repasar</button>'
        : '<p class="lock">' + ic('candado', 16) + ' Completa el Módulo ' + i + ' para desbloquear</p>';
      return '<article class="mod' + (bloq ? ' bloq' : '') + (actual ? ' actual' : '') + '" style="--mc:' + m.color + '">' +
        '<div class="mod-cover">' + portada(i, m) + '</div>' +
        '<div class="mod-body"><div class="mod-top"><span class="eyebrow">Módulo ' + (i + 1) + '</span>' + est + '</div>' +
        '<h3>' + esc(m.titulo) + '</h3>' +
        '<span class="muted">' + d + ' de ' + nL(i) + ' lecciones' + (listo && llevaEval(i) ? ' · evaluación aprobada' : '') + '</span>' +
        barra(pct, listo ? 'var(--verde)' : m.color) + sub +
        '<div class="mod-acc">' + accion + '</div></div></article>';
    }).join('');

    var todas = S.areasModo === 'Todas, las ajenas bloqueadas';
    var areas = AREAS.filter(function (a) { return todas || a.nombre === USUARIO.area; }).map(function (a) {
      var propia = a.nombre === USUARIO.area, abierta = propia && c.general;
      return '<article class="area' + (abierta ? ' abierta' : '') + '">' +
        '<span class="area-ic">' + ic(a.icono, 28) + '</span>' +
        '<div><h3>' + esc(a.nombre) + '</h3><p>' + (abierta ? 'Disponible. Inicia el módulo de tu área.' : propia ? 'Se activa al concluir la capacitación general.' : 'Corresponde al personal de esta área.') + '</p></div>' +
        (abierta ? '<button class="btn" data-a="aviso" data-t="El módulo de área está en preparación.">Iniciar</button>' : '<span class="area-lock">' + ic('candado', 18) + '</span>') +
        '</article>';
    }).join('');

    return '<div class="inicio">' +
      '<section class="hero">' +
        '<div class="hero-txt"><span class="eyebrow claro">Capacitación del Modelo CAIPA</span>' +
        '<h1>¡Hola, ' + esc(nombre) + '!</h1>' +
        '<p>Aquí aprenderás los fundamentos, la metodología y la operación del modelo. Avanza a tu ritmo: tu progreso se guarda automáticamente.</p>' +
        '<div class="hero-stats"><div><b>' + pctG + '%</b><span>avance general</span></div><div><b>' + hechasL + '/' + totalL + '</b><span>lecciones</span></div><div><b>' + esc(USUARIO.area) + '</b><span>tu área</span></div></div></div>' +
        '<div class="hero-art" aria-hidden="true">' + ilustracionHero() + '</div>' +
      '</section>' +
      sigue +
      '<section class="bloque"><div class="bloque-h"><h2>Tu ruta de capacitación</h2><ol class="ruta" aria-label="Ruta: 4 módulos, módulo de área y constancia">' + pasos + '</ol></div>' +
      '<div class="mods">' + tarjetas + '</div></section>' +
      '<section class="bloque"><div class="bloque-h"><h2>' + (todas ? 'Módulos por área' : 'Módulo de tu área') + '</h2></div><div class="areas">' + areas + '</div></section>' +
      '</div>';
  }

  /* Portada ilustrada de cada módulo (SVG generado; se puede cambiar por foto) */
  function portada(i, m) {
    var formas = [
      '<circle cx="250" cy="20" r="70" fill="#fff" opacity=".14"/><circle cx="40" cy="110" r="46" fill="#fff" opacity=".10"/><path d="M0 90 Q80 50 160 80 T320 70 V140 H0Z" fill="#fff" opacity=".12"/>',
      '<rect x="190" y="-30" width="140" height="140" rx="40" transform="rotate(20 260 40)" fill="#fff" opacity=".14"/><circle cx="60" cy="30" r="22" fill="#fff" opacity=".18"/><circle cx="110" cy="120" r="50" fill="#fff" opacity=".08"/>',
      '<path d="M200 0 L320 0 L320 120Z" fill="#fff" opacity=".12"/><path d="M0 140 L0 60 L120 140Z" fill="#fff" opacity=".10"/><circle cx="270" cy="95" r="18" fill="#fff" opacity=".2"/>',
      '<circle cx="280" cy="110" r="80" fill="none" stroke="#fff" stroke-width="14" opacity=".14"/><circle cx="280" cy="110" r="40" fill="none" stroke="#fff" stroke-width="10" opacity=".12"/><rect x="20" y="20" width="40" height="40" rx="10" fill="#fff" opacity=".14"/>'
    ];
    return '<svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="120" fill="' + m.color + '"/>' + (formas[i % 4]) + '</svg>' +
      '<span class="mod-ic">' + ic(m.icono, 28) + '</span><span class="mod-num">0' + (i + 1) + '</span>';
  }

  function ilustracionHero() {
    return '<svg viewBox="0 0 360 260">' +
      '<circle cx="250" cy="120" r="110" fill="#fff" opacity=".10"/>' +
      '<circle cx="250" cy="120" r="72" fill="#fff" opacity=".10"/>' +
      '<path d="M40 220 C110 220 120 150 190 150 S 280 90 330 60" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" opacity=".8"/>' +
      '<g><circle cx="40" cy="220" r="14" fill="#fff"/><circle cx="190" cy="150" r="14" fill="#FFD7B5"/><circle cx="330" cy="60" r="18" fill="#B0135A" stroke="#fff" stroke-width="4"/></g>' +
      '<g fill="#fff" opacity=".95"><circle cx="118" cy="96" r="16"/><path d="M92 150a26 26 0 0 1 52 0z"/>' +
      '<circle cx="168" cy="72" r="13" opacity=".8"/><path d="M147 116a21 21 0 0 1 42 0z" opacity=".8"/></g>' +
      '<path d="m322 52 6 6 10-12" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  /* ------- Lección ------- */
  function vistaLeccion() {
    var m = S.pos.m, l = S.pos.l, M = MODULOS[m], L = M.lecciones[l];
    var pantallas = L.pantallas.concat([{ titulo: 'Ideas clave', bloques: L.ideas.length ? [{ tipo: 'ideas', items: L.ideas }] : [PENDIENTE('Las ideas clave de esta lección están en preparación.')] }]);
    var si = Math.min(S.pos.s, pantallas.length - 1), P0 = pantallas[si];
    var esActual = l === S.prog.l[m];
    var ultima = si === pantallas.length - 1;
    var etiqueta = esActual ? 'Completar lección' : (l + 1 < nL(m) ? 'Siguiente lección' : 'Continuar');
    var segs = pantallas.map(function (x, k) { return '<button class="seg' + (k <= si ? ' on' : '') + '" data-a="pant" data-s="' + k + '" aria-label="Pantalla ' + (k + 1) + ': ' + esc(x.titulo) + '"></button>'; }).join('');

    return '<div class="leccion" style="--mc:' + M.color + '">' +
      '<div class="migas"><button class="link" data-a="inicio">' + ic('izq', 18) + ' Inicio</button><span>Módulo ' + (m + 1) + ' · ' + esc(M.corto) + '</span></div>' +
      '<header class="l-head"><span class="chip chip-mod">Lección ' + (m + 1) + '.' + (l + 1) + ' · ' + (l + 1) + ' de ' + nL(m) + '</span>' +
      '<h1>' + esc(L.titulo) + '</h1>' +
      (L.obj ? '<div class="l-meta"><span>' + ic('diana', 16) + '<span><b>Al terminar podrás</b> ' + esc(L.obj) + '</span></span><span>' + ic('reloj', 16) + ' ' + esc(L.dur) + '</span></div>' : '') +
      '</header>' +
      '<div class="segs">' + segs + '</div><span class="muted small">Pantalla ' + (si + 1) + ' de ' + pantallas.length + '</span>' +
      '<section class="tarjeta l-card" key="' + si + '"><h2>' + esc(P0.titulo) + '</h2>' + P0.bloques.map(bloque).join('') + '</section>' +
      '<div class="l-nav">' +
        (si > 0 ? '<button class="btn sec" data-a="pant" data-s="' + (si - 1) + '">' + ic('izq', 18) + ' Anterior</button>' : '<span></span>') +
        (ultima ? '<button class="btn verde" data-a="terminarLeccion">' + etiqueta + ' ' + ic('check', 18) + '</button>' : '<button class="btn" data-a="pant" data-s="' + (si + 1) + '">Siguiente ' + ic('der', 18) + '</button>') +
      '</div></div>';
  }

  function bloque(b) {
    switch (b.tipo) {
      case 'p': return '<p class="' + (b.destacado ? 'p-dest' : 'p') + '">' + esc(b.t) + '</p>';
      case 'cita': return '<blockquote class="cita">' + ic('diana', 30) + '<p>' + esc(b.t) + '</p></blockquote>';
      case 'nota': return '<aside class="nota">' + ic('info', 22) + '<div><b>' + esc(b.titulo) + '</b><p>' + esc(b.t) + '</p></div></aside>';
      case 'video': return '<div class="video"><span class="play">' + ic('play', 30) + '</span><b>' + esc(b.t) + '</b><span>Video interactivo H5P en preparación</span></div>';
      case 'img':
        return '<figure class="figura">' + (b.src ? '<img src="' + esc(b.src) + '" alt="' + esc(b.alt) + '" loading="lazy">' : '<div class="img-ph">' + ic('imagen', 40) + '<span>' + esc(b.alt) + '</span></div>') + (b.pie ? '<figcaption>' + esc(b.pie) + '</figcaption>' : '') + '</figure>';
      case 'dos': return '<div class="dos"><div class="dos-a"><b>' + esc(b.at) + '</b><p>' + esc(b.ab) + '</p></div><div class="dos-b"><b>' + esc(b.bt) + '</b><p>' + esc(b.bb) + '</p></div></div>';
      case 'ideas': return '<ul class="ideas">' + b.items.map(function (t, k) { return '<li style="--d:' + (k * 60) + 'ms">' + ic('check', 18) + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul>';
      case 'pendiente': return '<div class="pend">' + esc(b.t) + '</div>';
      case 'linea': return lineaTiempo();
    }
    return '';
  }

  /* ------- Línea del tiempo interactiva ------- */
  function lineaTiempo() {
    var T = S.tl, f = T.filtro || 'Todos', vis = visibles(f);
    var sel = vis.indexOf(T.sel) >= 0 ? T.sel : vis[0];
    var h = LINEA[sel], amb = AMBITOS[h.ambito];
    var pos = vis.indexOf(sel);
    var filtros = ['Todos'].concat(Object.keys(AMBITOS)).map(function (x) {
      var col = x === 'Todos' ? 'var(--tinta)' : AMBITOS[x].color;
      return '<button class="tl-f' + (x === f ? ' on' : '') + '" style="--ac:' + col + '" data-a="filtro" data-f="' + x + '" aria-pressed="' + (x === f) + '">' + (x === 'Todos' ? '' : '<i></i>') + x + '</button>';
    }).join('');

    var nodos = '', prev = null;
    vis.forEach(function (k) {
      var x = LINEA[k], a = AMBITOS[x.ambito], visto = T.vistos.indexOf(k) >= 0, on = k === sel;
      if (prev !== null) {
        var gap = x.anio - LINEA[prev].anio;
        nodos += '<li class="tl-gap' + (gap >= 4 ? ' largo' : '') + '" aria-hidden="true">' + (gap >= 4 ? '<span>' + gap + ' años</span>' : '') + '</li>';
      }
      nodos += '<li><button class="tl-nodo' + (on ? ' on' : '') + (visto ? ' visto' : '') + (x.clave ? ' clave' : '') + '" style="--ac:' + a.color + ';--as:' + a.suave + '" data-a="hito" data-k="' + k + '" aria-pressed="' + on + '" aria-label="' + x.anio + ', ' + esc(x.titulo) + (x.clave ? ', hito clave' : '') + (visto ? ', revisado' : '') + '">' +
        '<span class="tl-pt">' + (x.clave ? ic('estrella', 14) : visto && !on ? ic('check', 12) : '') + '</span><span class="tl-anio">' + x.anio + '</span></button></li>';
      prev = k;
    });

    var nVistos = T.vistos.length, total = LINEA.length, completo = nVistos >= total;
    var anterior = pos > 0 ? vis[pos - 1] : null, siguiente = pos < vis.length - 1 ? vis[pos + 1] : null;

    return '<div class="tl">' +
      '<div class="tl-top"><p class="muted">Explora los hitos. Usa las flechas del teclado o toca cada año.</p>' +
        '<div class="tl-prog"><span>' + nVistos + ' de ' + total + ' hitos</span>' + barra(Math.round(nVistos / total * 100), completo ? 'var(--verde)' : null) + '</div></div>' +
      '<div class="tl-filtros" role="group" aria-label="Filtrar por ámbito">' + filtros + '</div>' +
      '<div class="tl-pista"><ol class="tl-eje">' + nodos + '</ol></div>' +
      '<article class="tl-det" style="--ac:' + amb.color + ';--as:' + amb.suave + '" key="' + sel + '" aria-live="polite">' +
        '<div class="tl-det-media">' + (h.img ? '<img src="' + esc(h.img) + '" alt="">' : '<div class="tl-det-anio">' + h.anio + '</div>') + '</div>' +
        '<div class="tl-det-c">' +
          '<div class="tl-det-tags"><span class="tl-amb">' + h.ambito + '</span>' + (h.clave ? '<span class="tl-clave">' + ic('estrella', 12) + ' Hito clave</span>' : '') + '<span class="muted small">' + h.fecha + '</span></div>' +
          '<h3>' + esc(h.titulo) + '</h3><p>' + esc(h.hito) + '</p>' +
          '<div class="tl-det-nav">' +
            '<button class="btn sec sm" ' + (anterior !== null ? 'data-a="hito" data-k="' + anterior + '"' : 'disabled') + '>' + ic('izq', 16) + ' Anterior</button>' +
            '<span class="muted small">' + (pos + 1) + ' / ' + vis.length + '</span>' +
            '<button class="btn sm" ' + (siguiente !== null ? 'data-a="hito" data-k="' + siguiente + '"' : 'disabled') + '>Siguiente ' + ic('der', 16) + '</button>' +
          '</div></div></article>' +
      (completo ? '<p class="tl-ok">' + ic('check', 18) + ' ¡Revisaste todos los hitos! Ya puedes continuar.</p>' : '') +
      '</div>';
  }

  /* ------- Reflexión ------- */
  function vistaReflexion() {
    var m = S.rm, M = MODULOS[m], qs = M.reflexion;
    var items = qs.length ? qs.map(function (q, k) {
      return '<div class="campo"><label for="rq' + k + '"><span class="num">' + (k + 1) + '</span>' + esc(q) + '</label>' +
        '<textarea id="rq' + k + '" rows="3" data-in="rAns" data-k="' + k + '" placeholder="Escribe tu reflexión">' + esc((S.rAns || [])[k] || '') + '</textarea></div>';
    }).join('') : '<div class="pend">Las preguntas de reflexión de este módulo están en preparación.</div>';
    return '<div class="estrecho" style="--mc:' + M.color + '">' +
      '<div class="migas"><button class="link" data-a="inicio">' + ic('izq', 18) + ' Inicio</button><span>Módulo ' + (m + 1) + ' · ' + esc(M.corto) + '</span></div>' +
      '<header class="l-head"><span class="chip chip-mag">' + ic('reflexion', 14) + ' Actividad de reflexión</span><h1>Reflexiona sobre el Módulo ' + (m + 1) + '</h1>' +
      '<p class="muted">Mira el video y responde. No lleva calificación: sirve para relacionar el contenido con tu práctica.</p></header>' +
      '<section class="tarjeta"><div class="video mag"><span class="play">' + ic('play', 30) + '</span><b>Video interactivo de reflexión</b><span>Las preguntas aparecerán como pausas dentro del video H5P.</span></div>' +
      items + (S.rErr ? '<p class="error">Responde todas las preguntas para continuar.</p>' : '') +
      '<div class="der"><button class="btn verde" data-a="enviarReflexion">' + (qs.length ? 'Enviar reflexión' : 'Continuar') + '</button></div></section></div>';
  }

  /* ------- Evaluación ------- */
  function vistaEvalIntro() {
    var sc = S.scope, bl = bancoDe(sc).length, u = usados(sc), pm = permitidos(sc), ap = aprobado(sc), bq = bloqueado(sc);
    var reglas = [
      ['examen', Math.min(AJUSTES.preguntasPorIntento, bl) + ' preguntas de opción múltiple, elegidas al azar de un banco de ' + bl + '.'],
      ['diana', 'Calificación mínima aprobatoria: ' + AJUSTES.minimoAprobatorio + ' de 100.'],
      ['reiniciar', 'Tienes ' + AJUSTES.intentos + ' intentos. En cada intento cambian las preguntas.'],
      ['check', 'Las respuestas correctas se muestran solo al aprobar.']
    ];
    var puntos = ''; for (var i = 0; i < pm; i++) puntos += '<span class="int' + (i < u ? ' usado' : '') + '"></span>';
    return '<div class="estrecho">' +
      '<div class="migas"><button class="link" data-a="inicio">' + ic('izq', 18) + ' Inicio</button></div>' +
      '<section class="tarjeta eval-intro"><span class="chip chip-mod">' + ic('examen', 14) + ' Evaluación</span><h1>' + nombreEval(sc) + '</h1>' +
      '<ul class="reglas">' + reglas.map(function (r) { return '<li>' + ic(r[0], 20) + '<span>' + r[1] + '</span></li>'; }).join('') + '</ul>' +
      '<div class="intentos"><span>Intentos usados: <b>' + u + ' de ' + pm + '</b></span><span class="ints">' + puntos + '</span></div>' +
      (bq ? '<p class="error">Usaste todos tus intentos. La coordinación te contactará para programar una reunión por Zoom; después se habilitará un tercer intento.</p>' : '') +
      (ap ? '<p class="exito">Ya aprobaste esta evaluación.</p>' : '') +
      (!ap && !bq ? '<div class="der"><button class="btn" data-a="empezarEval">' + (u === 0 ? 'Comenzar evaluación' : 'Presentar intento ' + (u + 1)) + ' ' + ic('der', 18) + '</button></div>' : '') +
      '</section></div>';
  }

  function vistaEval() {
    var sc = S.scope, B = bancoDe(sc), E = S.ev, i = E.i || 0, q = B[E.qs[i]], n = E.qs.length;
    var contestadas = Object.keys(E.ans).length;
    var puntos = E.qs.map(function (_, k) {
      return '<button class="qdot' + (E.ans[k] !== undefined ? ' resp' : '') + (k === i ? ' on' : '') + '" data-a="irPregunta" data-i="' + k + '" aria-label="Pregunta ' + (k + 1) + (E.ans[k] !== undefined ? ', respondida' : '') + '">' + (k + 1) + '</button>';
    }).join('');
    var ops = q.opts.map(function (o, oi) {
      var on = E.ans[i] === oi;
      return '<button class="op' + (on ? ' on' : '') + '" data-a="opcion" data-q="' + i + '" data-o="' + oi + '" aria-pressed="' + on + '"><span class="op-l">' + 'abcd'.charAt(oi) + '</span><span>' + esc(o) + '</span></button>';
    }).join('');
    var ultima = i === n - 1;
    return '<div class="estrecho">' +
      '<header class="l-head"><span class="chip chip-mod">Intento ' + (usados(sc) + 1) + ' de ' + permitidos(sc) + '</span><h1>' + nombreEval(sc) + '</h1></header>' +
      '<div class="qdots" aria-label="Preguntas">' + puntos + '</div>' +
      '<span class="muted small">Respondidas: ' + contestadas + ' de ' + n + '</span>' +
      '<section class="tarjeta pregunta" key="q' + i + '"><span class="eyebrow">Pregunta ' + (i + 1) + ' de ' + n + '</span><h2>' + esc(q.q) + '</h2><div class="ops">' + ops + '</div></section>' +
      (S.evErr ? '<p class="error">Te faltan preguntas por responder. Te llevamos a la primera pendiente.</p>' : '') +
      '<div class="l-nav">' +
        (i > 0 ? '<button class="btn sec" data-a="irPregunta" data-i="' + (i - 1) + '">' + ic('izq', 18) + ' Anterior</button>' : '<span></span>') +
        (ultima ? '<button class="btn" data-a="enviarEval">Enviar respuestas</button>' : '<button class="btn" data-a="irPregunta" data-i="' + (i + 1) + '">Siguiente ' + ic('der', 18) + '</button>') +
      '</div></div>';
  }

  function vistaResultado() {
    var sc = S.scope, R = S.res, B = bancoDe(sc), quedan = permitidos(sc) - usados(sc);
    var desc = 'Respondiste correctamente ' + R.correct + ' de ' + R.qs.length + ' preguntas. ';
    if (R.pass) desc += 'Revisa tus respuestas abajo.';
    else if (quedan > 0) desc += 'Necesitas ' + AJUSTES.minimoAprobatorio + ' para aprobar. Te queda' + (quedan === 1 ? ' 1 intento' : 'n ' + quedan + ' intentos') + '; las preguntas cambiarán.';
    else desc += 'Usaste todos tus intentos: la coordinación te contactará para programar una reunión por Zoom y después se habilitará un tercer intento.';
    var color = R.pass ? 'var(--verde)' : 'var(--magenta)';
    var revision = R.pass ? '<section class="bloque"><h2>Revisión de respuestas</h2>' + R.qs.map(function (bi, qi) {
      var q = B[bi], mia = R.ans[qi], ok = mia === q.ans;
      return '<article class="rev ' + (ok ? 'bien' : 'mal') + '"><h3>' + (qi + 1) + '. ' + esc(q.q) + '</h3>' +
        '<p class="tu">' + (ok ? ic('check', 16) : ic('cerrar', 16)) + ' <b>Tu respuesta:</b> ' + esc(q.opts[mia]) + '</p>' +
        (!ok ? '<p class="correcta"><b>Respuesta correcta:</b> ' + esc(q.opts[q.ans]) + '</p>' : '') +
        '<p class="muted">' + esc(q.fb) + '</p></article>';
    }).join('') + '</section>' : '';
    return '<div class="estrecho">' +
      '<section class="tarjeta resultado">' + anillo(R.score, '<b>' + R.score + '</b><small>de 100</small>', color, 136) +
      '<div><h1>' + (R.pass ? '¡Aprobaste la evaluación!' : 'No alcanzaste la calificación mínima') + '</h1><p class="muted">' + desc + '</p>' +
      '<div class="btns">' +
        (R.pass ? '<button class="btn verde" data-a="resultadoContinuar">Continuar</button>' : '') +
        (!R.pass && quedan > 0 ? '<button class="btn" data-a="empezarEval">Presentar de nuevo</button>' : '') +
        (!R.pass ? '<button class="btn sec" data-a="repasarModulo">Repasar el módulo</button>' : '') +
        (!R.pass && quedan <= 0 ? '<button class="btn sec" data-a="evalIntro" data-m="' + sc + '">Ver estado</button>' : '') +
      '</div></div></section>' + revision + '</div>';
  }

  function vistaModuloListo(c) {
    var dm = S.dm, nx = dm + 1 < NM ? dm + 1 : -1, desc, boton = '';
    if (nx >= 0) { desc = 'Se desbloqueó el Módulo ' + (nx + 1) + ': ' + MODULOS[nx].titulo + '.'; boton = '<button class="btn" data-a="continuar" data-m="' + nx + '">Ir al Módulo ' + (nx + 1) + '</button>'; }
    else if (c.finalPendiente) { desc = 'Concluiste los 4 módulos. Ya puedes presentar la evaluación final.'; boton = '<button class="btn" data-a="evalIntro" data-m="F">Presentar evaluación final</button>'; }
    else { desc = 'Concluiste la capacitación general. Se activó el módulo de tu área y ya puedes descargar tu constancia.'; boton = '<button class="btn" data-a="constancia">' + ic('constancia', 18) + ' Ver mi constancia</button>'; }
    var confeti = ''; for (var k = 0; k < 18; k++) confeti += '<i style="--x:' + (Math.cos(k / 18 * 6.283) * 120).toFixed(0) + 'px;--y:' + (Math.sin(k / 18 * 6.283) * 120).toFixed(0) + 'px;--c:' + ['#D96D16', '#B0135A', '#0E7C7B', '#5B4B9A'][k % 4] + '"></i>';
    return '<div class="logro"><div class="logro-ic"><span class="confeti" aria-hidden="true">' + confeti + '</span>' + ic('check', 56) + '</div>' +
      '<h1>¡Concluiste el Módulo ' + (dm + 1) + '!</h1><p class="muted">' + desc + '</p>' +
      '<div class="btns centro">' + boton + '<button class="btn sec" data-a="inicio">Volver al inicio</button></div></div>';
  }

  /* ------- Constancia ------- */
  function vistaConstancia(c) {
    var migas = '<div class="migas no-print"><button class="link" data-a="inicio">' + ic('izq', 18) + ' Inicio</button><span>Mi constancia</span></div>';
    if (!c.general) {
      return '<div class="estrecho">' + migas + '<section class="tarjeta"><span class="chip chip-off">' + ic('candado', 12) + ' Bloqueada</span>' +
        '<h1>Tu constancia aún no está disponible</h1><p class="muted">Se activa al concluir los 4 módulos de la capacitación general y aprobar sus evaluaciones.</p></section></div>';
    }
    var p = S.prog, fecha = p.fecha ? new Date(p.fecha) : new Date();
    var fechaTxt = fecha.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    var semilla = 0; (USUARIO.nombre + USUARIO.area).split('').forEach(function (ch) { semilla = (semilla * 31 + ch.charCodeAt(0)) % 100000; });
    var folio = 'CAIPA-' + fecha.getFullYear() + '-' + ('0000' + semilla).slice(-5);
    var dd = ('0' + fecha.getDate()).slice(-2), mm = ('0' + (fecha.getMonth() + 1)).slice(-2);
    var fechaCorta = dd + '-' + mm + '-' + fecha.getFullYear();
    var cals = [];
    MODULOS.forEach(function (m, i) { var cal = p.cal && p.cal[String(i)]; if (cal != null) cals.push(cal); });
    if (!porModulo() && p.cal && p.cal.F != null) cals = [p.cal.F];
    var prom = cals.length ? Math.round(cals.reduce(function (a, b) { return a + b; }, 0) / cals.length) : null;
    var K = CONSTANCIA;
    function logo(src, i) { return src ? '<img src="' + esc(src) + '" alt="">' : '<span class="logo-slot">LOGO ' + (i + 1) + '</span>'; }
    var modulos = MODULOS.map(function (m, i) { return '<li><b>' + (i + 1) + '</b> ' + esc(m.corto) + '</li>'; }).join('');

    return '<div class="const-vista">' + migas +
      '<div class="const-acc no-print"><div><h1>Tu constancia</h1><p class="muted">Revisa tus datos. Al descargar, elige <b>Guardar como PDF</b> en la ventana de impresión.</p></div>' +
      '<button class="btn" data-a="imprimir">' + ic('documento', 18) + ' Descargar PDF</button></div>' +
      '<div class="const-marco"><article class="const-hoja" aria-label="Constancia">' +
        '<span class="const-raya a"></span><span class="const-raya b"></span>' +
        '<header class="const-logos">' + K.logos.map(logo).join('<span class="const-sep"></span>') + '</header>' +
        '<p class="const-emisor">' + esc(K.emisor) + '</p>' +
        '<p class="const-emisor2">' + esc(K.emisor2) + '</p>' +
        '<p class="const-otorga">Otorga la presente</p>' +
        '<h2 class="const-titulo">Constancia</h2>' +
        '<div class="const-nombre"><span>a:</span><b>' + esc(USUARIO.nombre) + '</b></div>' +
        '<p class="const-por">Por haber concluido satisfactoriamente la capacitación:</p>' +
        '<p class="const-curso">' + esc(K.curso) + '</p>' +
        '<ul class="const-mods">' + modulos + '</ul>' +
        '<p class="const-detalle">Área: <b>' + esc(USUARIO.area) + '</b> · ' + esc(USUARIO.centro) + (prom != null ? ' · Calificación: <b>' + prom + '</b>' : '') + '</p>' +
        '<p class="const-modalidad">' + esc(K.modalidad) + '</p>' +
        '<div class="const-firma">' + (K.firma ? '<img src="' + esc(K.firma) + '" alt="">' : '<span class="firma-esp"></span>') +
          '<b>' + esc(K.firmante) + '</b><span>' + esc(K.cargo) + '<br>' + esc(K.cargo2) + '</span></div>' +
        '<footer class="const-pie"><span class="const-ciudad">' + esc(K.ciudad) + '</span><span class="const-fecha">' + fechaCorta + '</span><span class="const-folio">Folio ' + folio + '</span></footer>' +
      '</article></div></div>';
  }

  /* ---------------- Render ---------------- */
  function render() {
    var c = calc(), v = S.view, cuerpo;
    if (v === 'lesson') cuerpo = vistaLeccion();
    else if (v === 'reflect') cuerpo = vistaReflexion();
    else if (v === 'evalIntro') cuerpo = vistaEvalIntro();
    else if (v === 'eval' && S.ev) cuerpo = vistaEval();
    else if (v === 'evalResult' && S.res) cuerpo = vistaResultado();
    else if (v === 'modDone') cuerpo = vistaModuloListo(c);
    else if (v === 'constancia') cuerpo = vistaConstancia(c);
    else cuerpo = vistaInicio(c);
    app.innerHTML = demoBar() + encabezado() + '<div class="marco' + (menuAbierto ? ' con-menu' : '') + '">' + navLateral(c) + '<main id="contenido" class="vista vista-' + v + '">' + cuerpo + '</main></div>';
    /* Solo anima un bloque cuando su contenido cambió (no al elegir una opción) */
    var llave = v + '|' + (S.pos && S.pos.m) + '.' + (S.pos && S.pos.l);
    if (llave === ultimaVista) app.querySelector('.vista').classList.add('quieta');
    ultimaVista = llave;
    app.querySelectorAll('[key]').forEach(function (el) {
      var id = el.className.split(' ')[0] + '|' + llave;
      if (ultimasLlaves[id] === el.getAttribute('key')) el.classList.add('quieto');
      ultimasLlaves[id] = el.getAttribute('key');
    });
  }
  var ultimaVista = null, ultimasLlaves = {};

  /* ---------------- Eventos ---------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]');
    if (!el || el.disabled) return;
    var f = A[el.dataset.a];
    if (f) { e.preventDefault(); f(el.dataset); }
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.ch && A[el.dataset.ch]) {
      var v = el.value;
      if (el.dataset.ch === 'demoPreset') A.demoPreset({ p: v }); else A[el.dataset.ch]({ v: v });
    }
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.in === 'rAns') {
      var a = (S.rAns || ['', '', '']).slice(); a[+el.dataset.k] = el.value; S.rAns = a; S.rErr = false; guardar();
    }
  });
  document.addEventListener('keydown', function (e) {
    var el = document.activeElement;
    if (el && el.classList && el.classList.contains('tl-nodo') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      var vis = visibles(S.tl.filtro || 'Todos'), p = vis.indexOf(+el.dataset.k) + (e.key === 'ArrowRight' ? 1 : -1);
      if (p >= 0 && p < vis.length) { e.preventDefault(); A.hito({ k: vis[p] }); }
    }
    if (e.key === 'Escape' && menuAbierto && window.innerWidth < 1024) { menuAbierto = false; render(); }
  });

  render();
})();
