/**
 * Custom Cursor Effects
 * Creates magical mouse trail and interactive cursor
 */

(function() {
  'use strict';

  // Check if device supports hover (not touch device)
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cursorDot, cursorOutline, cursorGlow;
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let outlineX = 0, outlineY = 0;
  let glowX = 0, glowY = 0;
  let trailTimer;

  // Initialize cursor elements
  function initCursor() {
    // Create cursor dot
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    // Create cursor outline
    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    // Create cursor glow (if motion not reduced)
    if (!prefersReducedMotion) {
      cursorGlow = document.createElement('div');
      cursorGlow.className = 'cursor-glow';
      document.body.appendChild(cursorGlow);
    }

    // Track mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Handle hover states on interactive elements
    initHoverStates();

    // Start animation loop
    animate();
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create trail particles (if motion not reduced)
    if (!prefersReducedMotion) {
      createTrailParticle(mouseX, mouseY);
    }
  }

  function createTrailParticle(x, y) {
    // Throttle trail creation
    if (trailTimer) return;

    trailTimer = setTimeout(() => {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = `${x - 3}px`;
      trail.style.top = `${y - 3}px`;
      document.body.appendChild(trail);

      // Remove trail particle after animation
      setTimeout(() => {
        trail.remove();
      }, 800);

      trailTimer = null;
    }, 30); // Create trail every 30ms
  }

  function animate() {
    // Smooth follow for cursor dot (fast)
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;

    // Smooth follow for cursor outline (slower)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    // Update cursor positions
    if (cursorDot) {
      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    }

    if (cursorOutline) {
      cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    }

    // Update glow position (slowest)
    if (cursorGlow && !prefersReducedMotion) {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.transform = `translate(${glowX - 100}px, ${glowY - 100}px)`;
    }

    requestAnimationFrame(animate);
  }

  function initHoverStates() {
    // Get all interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .clickable, .bento-card, .btn-primary, .btn-secondary';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.classList.add('cursor-hover');
        if (cursorOutline) cursorOutline.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.classList.remove('cursor-hover');
        if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
      });
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches && node.matches(interactiveSelectors)) {
            node.addEventListener('mouseenter', () => {
              if (cursorDot) cursorDot.classList.add('cursor-hover');
              if (cursorOutline) cursorOutline.classList.add('cursor-hover');
            });

            node.addEventListener('mouseleave', () => {
              if (cursorDot) cursorDot.classList.remove('cursor-hover');
              if (cursorOutline) cursorOutline.classList.remove('cursor-hover');
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }

})();
