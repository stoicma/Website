/**
 * Micro-interactions with Motion One
 * Lightweight, spring-based animations for delightful UX
 */

(function() {
  'use strict';

  // Wait for DOM and Motion library to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Check if Motion library is available
    if (typeof Motion === 'undefined' || !Motion.animate) {
      console.warn('Motion One library not loaded, skipping micro-interactions');
      return;
    }

    const { animate, spring } = Motion;

    // Initialize all micro-interactions
    initButtonInteractions();
    initLinkInteractions();

    initInputFocusEffects();
    initSocialIconHovers();
    initScrollIndicator();
  });

  /**
   * Button press feedback with spring physics
   */
  function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .button, .cta-button');

    buttons.forEach(button => {
      // Press down effect
      button.addEventListener('mousedown', () => {
        Motion.animate(
          button,
          { scale: 0.95 },
          { duration: 0.15, easing: 'ease-out' }
        );
      });

      // Release effect with spring
      button.addEventListener('mouseup', () => {
        Motion.animate(
          button,
          { scale: 1 },
          { duration: 0.3, easing: Motion.spring({ stiffness: 300, damping: 15 }) }
        );
      });

      // Also handle mouse leave (in case user drags off)
      button.addEventListener('mouseleave', () => {
        Motion.animate(
          button,
          { scale: 1 },
          { duration: 0.2, easing: 'ease-out' }
        );
      });
    });
  }

  /**
   * Link hover effects with underline reveal
   */
  function initLinkInteractions() {
    const links = document.querySelectorAll('a:not(.btn-primary):not(.btn-secondary):not(.button)');

    links.forEach(link => {
      // Skip if link has no text content
      if (!link.textContent.trim()) return;

      // Create underline element
      const underline = document.createElement('span');
      underline.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        pointer-events: none;
      `;

      // Only add underline if link doesn't have special styling
      if (!link.querySelector('i.fa') && link.offsetHeight < 100) {
        link.style.position = 'relative';
        link.appendChild(underline);

        link.addEventListener('mouseenter', () => {
          Motion.animate(
            underline,
            { scaleX: 1, transformOrigin: 'left' },
            { duration: 0.3, easing: Motion.spring({ stiffness: 300, damping: 20 }) }
          );
        });

        link.addEventListener('mouseleave', () => {
          Motion.animate(
            underline,
            { scaleX: 0, transformOrigin: 'right' },
            { duration: 0.25, easing: 'ease-out' }
          );
        });
      }
    });
  }


  /**
   * Input focus animations
   */
  function initInputFocusEffects() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, #chatbot-modal-input');

    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        Motion.animate(
          input,
          { scale: 1.02, boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' },
          { duration: 0.2, easing: 'ease-out' }
        );
      });

      input.addEventListener('blur', () => {
        Motion.animate(
          input,
          { scale: 1, boxShadow: '0 0 0 0px rgba(37, 99, 235, 0)' },
          { duration: 0.2, easing: 'ease-out' }
        );
      });
    });
  }

  /**
   * Social icon hover effects
   */
  function initSocialIconHovers() {
    const socialIcons = document.querySelectorAll('.social-icons a');

    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        Motion.animate(
          icon,
          { y: -4, scale: 1.1 },
          { duration: 0.3, easing: Motion.spring({ stiffness: 400, damping: 15 }) }
        );
      });

      icon.addEventListener('mouseleave', () => {
        Motion.animate(
          icon,
          { y: 0, scale: 1 },
          { duration: 0.25, easing: Motion.spring({ stiffness: 300, damping: 20 }) }
        );
      });
    });
  }

  /**
   * Scroll indicator pulse animation
   */
  function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
      // Continuous pulse animation
      function pulseAnimation() {
        Motion.animate(
          scrollIndicator,
          { y: [0, -10, 0], opacity: [0.7, 1, 0.7] },
          { duration: 2, easing: 'ease-in-out' }
        ).finished.then(pulseAnimation);
      }

      pulseAnimation();
    }
  }

  /**
   * Accessibility: Reduce motion support
   */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Override all Motion One animations to be instant
    if (typeof Motion !== 'undefined') {
      Motion.animate = function(element, keyframes, options) {
        Object.assign(element.style, keyframes);
        return { finished: Promise.resolve() };
      };
    }
  }

})();
