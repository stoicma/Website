/**
 * Custom Cursor Effects
 * Creates themed mouse trail and interactive cursor
 * Trail themes: binary (0s and 1s), chess pieces, ethereum diamonds
 */

(function() {
  'use strict';

  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cursorDot, cursorOutline, cursorGlow;
  var mouseX = 0, mouseY = 0;
  var dotX = 0, dotY = 0;
  var outlineX = 0, outlineY = 0;
  var glowX = 0, glowY = 0;
  var trailTimer;

  // Trail themes
  var themes = {
    binary: {
      chars: ['0', '1'],
      label: '01',
      color: '#2563eb'
    },
    chess: {
      chars: ['\u2659', '\u2658', '\u2657', '\u2656', '\u2655', '\u2654'],
      label: '\u265F',
      color: '#2563eb'
    },
    ethereum: {
      chars: ['\u25C6', '\u2B25', '\u25C8'],
      label: '\u25C6',
      color: '#2563eb'
    }
  };

  var themeKeys = ['binary', 'chess', 'ethereum'];
  var currentTheme = localStorage.getItem('cursorTheme') || 'binary';

  function initCursor() {
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    if (!prefersReducedMotion) {
      cursorGlow = document.createElement('div');
      cursorGlow.className = 'cursor-glow';
      document.body.appendChild(cursorGlow);
    }

    document.addEventListener('mousemove', handleMouseMove);
    initHoverStates();
    if (!prefersReducedMotion) initThemePicker();
    animate();
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!prefersReducedMotion) {
      createTrailParticle(mouseX, mouseY);
    }
  }

  function createTrailParticle(x, y) {
    if (trailTimer) return;

    trailTimer = setTimeout(function() {
      var theme = themes[currentTheme];
      var chars = theme.chars;
      var char = chars[Math.floor(Math.random() * chars.length)];

      var trail = document.createElement('span');
      trail.className = 'mouse-trail';
      trail.textContent = char;
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      trail.style.color = theme.color;
      document.body.appendChild(trail);

      setTimeout(function() {
        trail.remove();
      }, 1000);

      trailTimer = null;
    }, 40);
  }

  function animate() {
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    if (cursorDot) {
      cursorDot.style.transform = 'translate(' + (dotX - 4) + 'px, ' + (dotY - 4) + 'px)';
    }
    if (cursorOutline) {
      cursorOutline.style.transform = 'translate(' + (outlineX - 20) + 'px, ' + (outlineY - 20) + 'px)';
    }
    if (cursorGlow && !prefersReducedMotion) {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.transform = 'translate(' + (glowX - 100) + 'px, ' + (glowY - 100) + 'px)';
    }

    requestAnimationFrame(animate);
  }

  function initThemePicker() {
    var picker = document.createElement('div');
    picker.className = 'cursor-theme-picker';

    themeKeys.forEach(function(key) {
      var btn = document.createElement('button');
      btn.className = 'cursor-theme-btn';
      btn.setAttribute('data-theme', key);
      btn.textContent = themes[key].label;
      btn.title = key.charAt(0).toUpperCase() + key.slice(1) + ' trail';
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

  function initHoverStates() {
    var interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .clickable, .bento-card, .btn-primary, .btn-secondary';
    var interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        if (cursorDot) cursorDot.classList.add('cursor-hover');
        if (cursorOutline) cursorOutline.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', function() {
        if (cursorDot) cursorDot.classList.remove('cursor-hover');
        if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
      });
    });

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && node.matches && node.matches(interactiveSelectors)) {
            node.addEventListener('mouseenter', function() {
              if (cursorDot) cursorDot.classList.add('cursor-hover');
              if (cursorOutline) cursorOutline.classList.add('cursor-hover');
            });
            node.addEventListener('mouseleave', function() {
              if (cursorDot) cursorDot.classList.remove('cursor-hover');
              if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }

})();
