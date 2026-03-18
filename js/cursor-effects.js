/**
 * Custom Cursor Trail Effects
 * Themed particle trails: binary, chess, ethereum
 * Native cursor stays visible. Trails are purely decorative.
 */

(function() {
  'use strict';

  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var trailTimer;

  // Build an Ethereum diamond SVG element (the actual logo shape)
  function createEthSVG(color) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 16 26');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '22');

    var paths = [
      { d: 'M8 0L0 13.25L8 10.1L16 13.25L8 0Z', opacity: '0.8' },
      { d: 'M8 10.1L0 13.25L8 17.65L16 13.25L8 10.1Z', opacity: '0.6' },
      { d: 'M0 14.75L8 26L16 14.75L8 19.15L0 14.75Z', opacity: '0.8' }
    ];

    paths.forEach(function(p) {
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('fill', color);
      path.setAttribute('opacity', p.opacity);
      svg.appendChild(path);
    });

    return svg;
  }

  // Build a small ETH icon for the picker button
  function createEthIcon() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 16 26');
    svg.setAttribute('width', '12');
    svg.setAttribute('height', '19');

    var paths = [
      { d: 'M8 0L0 13.25L8 10.1L16 13.25L8 0Z', opacity: '0.8' },
      { d: 'M8 10.1L0 13.25L8 17.65L16 13.25L8 10.1Z', opacity: '0.6' },
      { d: 'M0 14.75L8 26L16 14.75L8 19.15L0 14.75Z', opacity: '0.8' }
    ];

    paths.forEach(function(p) {
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('fill', 'currentColor');
      path.setAttribute('opacity', p.opacity);
      svg.appendChild(path);
    });

    return svg;
  }

  // Trail themes
  var themes = {
    binary: {
      type: 'text',
      chars: ['0', '1'],
      label: '01',
      color: '#2563eb',
      size: 'normal'
    },
    chess: {
      type: 'text',
      chars: ['\u2659', '\u2658', '\u2657', '\u2656', '\u2655', '\u2654'],
      label: '\u265F',
      color: '#2563eb',
      size: 'large'
    },
    ethereum: {
      type: 'svg',
      colors: ['#627EEA', '#8C9EEF', '#4A6CF7']
    }
  };

  var themeKeys = ['binary', 'chess', 'ethereum'];
  var currentTheme = localStorage.getItem('cursorTheme') || 'binary';

  function createTrailParticle(x, y) {
    if (trailTimer) return;

    trailTimer = setTimeout(function() {
      var theme = themes[currentTheme];

      if (theme.type === 'svg') {
        var colors = theme.colors;
        var color = colors[Math.floor(Math.random() * colors.length)];
        var wrapper = document.createElement('div');
        wrapper.className = 'mouse-trail-svg';
        wrapper.appendChild(createEthSVG(color));
        wrapper.style.left = x + 'px';
        wrapper.style.top = y + 'px';
        document.body.appendChild(wrapper);

        setTimeout(function() { wrapper.remove(); }, 1000);
      } else {
        var chars = theme.chars;
        var char = chars[Math.floor(Math.random() * chars.length)];
        var trail = document.createElement('span');
        trail.className = 'mouse-trail' + (theme.size === 'large' ? ' mouse-trail--large' : '');
        trail.textContent = char;
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.color = theme.color;
        document.body.appendChild(trail);

        setTimeout(function() { trail.remove(); }, 1000);
      }

      trailTimer = null;
    }, 40);
  }

  function initThemePicker() {
    var picker = document.createElement('div');
    picker.className = 'cursor-theme-picker';

    themeKeys.forEach(function(key) {
      var btn = document.createElement('button');
      btn.className = 'cursor-theme-btn';
      btn.setAttribute('data-theme', key);
      btn.title = key.charAt(0).toUpperCase() + key.slice(1) + ' trail';

      if (key === 'ethereum') {
        btn.appendChild(createEthIcon());
      } else {
        btn.textContent = themes[key].label;
      }

      if (key === currentTheme) btn.classList.add('active');

      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentTheme = key;
        localStorage.setItem('cursorTheme', key);
        var allBtns = picker.querySelectorAll('.cursor-theme-btn');
        for (var i = 0; i < allBtns.length; i++) {
          allBtns[i].classList.remove('active');
        }
        btn.classList.add('active');
      });

      picker.appendChild(btn);
    });

    document.body.appendChild(picker);
  }

  function init() {
    document.addEventListener('mousemove', function(e) {
      createTrailParticle(e.clientX, e.clientY);
    });
    initThemePicker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
