// js/main.js: interactividad de la guía de CSS
document.addEventListener('DOMContentLoaded', function () {

  // 1. Botón "Copiar" en cada bloque de código
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-copiar';
    btn.textContent = 'Copiar';
    btn.addEventListener('click', function () {
      var codigo = pre.querySelector('code');
      var texto = codigo ? codigo.textContent : pre.textContent;
      navigator.clipboard.writeText(texto).then(function () {
        btn.textContent = '¡Copiado!';
        setTimeout(function () { btn.textContent = 'Copiar'; }, 1500);
      });
    });
    pre.appendChild(btn);
  });

  // 2. Resaltar en el menú el tema que se está leyendo
  var enlaces = document.querySelectorAll('.navbar .nav-link');
  var secciones = document.querySelectorAll('main section[id]');
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        enlaces.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secciones.forEach(function (s) { observador.observe(s); });

  // 3. Cerrar el menú del celular al elegir un tema
  var colapso = document.getElementById('menu');
  enlaces.forEach(function (a) {
    a.addEventListener('click', function () {
      if (colapso.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(colapso).hide();
      }
    });
  });

  // 4. Playground de Flexbox
  var pgJustify = document.getElementById('pg-justify');
  var pgGap = document.getElementById('pg-gap');
  var pgGapVal = document.getElementById('pg-gap-val');
  var pgCaja = document.getElementById('pg-caja');
  var pgCodigo = document.getElementById('pg-codigo');

  function actualizarFlex() {
    pgCaja.style.justifyContent = pgJustify.value;
    pgCaja.style.gap = pgGap.value + 'px';
    pgGapVal.textContent = pgGap.value;
    pgCodigo.textContent =
      '.contenedor {\n' +
      '  display: flex;\n' +
      '  justify-content: ' + pgJustify.value + ';\n' +
      '  gap: ' + pgGap.value + 'px;\n' +
      '}';
  }
  pgJustify.addEventListener('change', actualizarFlex);
  pgGap.addEventListener('input', actualizarFlex);
  actualizarFlex();

  // 5. Indicador del ancho de pantalla y breakpoint
  var indicador = document.getElementById('indicador-ancho');
  function actualizarAncho() {
    var w = window.innerWidth;
    var nombre;
    if (w >= 1200) nombre = 'xl (desde 1200 px)';
    else if (w >= 992) nombre = 'lg (desde 992 px)';
    else if (w >= 768) nombre = 'md (desde 768 px)';
    else if (w >= 576) nombre = 'sm (desde 576 px)';
    else nombre = 'menos de 576 px';
    indicador.textContent = w + ' px · ' + nombre;
  }
  window.addEventListener('resize', actualizarAncho);
  actualizarAncho();

  // 6. Playground de z-index: la caja roja cambia de color según su capa
  var zRoja = document.getElementById('zi-roja');
  var zValor = document.getElementById('zi-valor');
  var zTxt = document.getElementById('zi-valor-txt');
  var coloresRoja = {
    '1': '#C8553D',
    '2': '#8A6A1F',
    '3': '#5B7F3A',
    '4': '#6B4E71'
  };
  function actualizarZ() {
    zRoja.style.zIndex = zValor.value;
    zRoja.style.background = coloresRoja[zValor.value];
    zTxt.textContent = zValor.value;
  }
  zValor.addEventListener('input', actualizarZ);
  actualizarZ();