// js/grupos.js: organiza los temas en partes y agrega el enlace "Siguiente"
document.addEventListener('DOMContentLoaded', function () {

  var partes = [
    {
      inicio: 't21',
      titulo: 'Fundamentos',
      texto: 'Cómo se escribe CSS, cómo se agrega a la página y cómo se heredan los estilos.'
    },
    {
      inicio: 't24',
      titulo: 'Reglas y diseño',
      texto: 'Qué regla gana cuando hay conflicto, y cómo acomodar elementos en la pantalla.'
    },
    {
      inicio: 't27',
      titulo: 'Elementos e interacción',
      texto: 'Partes de un elemento, estados del mouse y el orden de las capas.'
    }
  ];

  // 1. Encabezado de cada parte, antes de su primer tema
  partes.forEach(function (p, i) {
    var primera = document.getElementById(p.inicio);
    if (!primera) return;
    var cabecera = document.createElement('header');
    cabecera.className = 'grupo';
    cabecera.innerHTML =
      '<span class="grupo-num">Parte ' + (i + 1) + '</span>' +
      '<h2 class="grupo-titulo">' + p.titulo + '</h2>' +
      '<p>' + p.texto + '</p>';
    primera.parentNode.insertBefore(cabecera, primera);
  });

  // 2. Enlace "Siguiente" al final de cada tema, menos en el último
  var secciones = Array.from(document.querySelectorAll('main section[id]'));
  secciones.forEach(function (s, i) {
    if (i === secciones.length - 1) return;
    var sig = secciones[i + 1];
    var nav = document.createElement('div');
    nav.className = 'siguiente';
    nav.innerHTML = '<a href="#' + sig.id + '">Siguiente: ' +
      sig.querySelector('h2').textContent + ' →</a>';
    s.appendChild(nav);
  });
});