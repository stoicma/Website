/**
 * Motion Design Initialization
 * Modern animations using GSAP, ScrollTrigger, and Lenis
 */

(function() {
  'use strict';

  // Initialize Lenis smooth scroll (faster duration for better UX)
  const lenis = new Lenis({
    duration: 0.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false // Disable on mobile for better performance
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Sync Lenis with GSAP ScrollTrigger
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {

    // Hero section animations
    initHeroAnimations();

    // Section reveal animations
    initSectionReveals();

    // Service cards animations
    initServiceCards();

    // Floating interests grid (if exists)
    initInterestsGrid();

    // Scroll progress indicator
    initScrollProgress();

    // Enhanced hover effects
    initHoverEffects();

    // Fix same-page anchor link scrolling
    initAnchorScrolling();
  });

  /**
   * Handle same-page anchor link clicks for smooth scrolling
   */
  function initAnchorScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty anchors

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -100, // Account for sticky nav
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      });
    });
  }

  /**
   * Hero section entrance animations with blur-to-focus
   */
  function initHeroAnimations() {
    // Modern hero (cutting-edge)
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroCTA = document.querySelector('.hero-cta-group');
    const heroPhoto = document.querySelector('.hero-photo');
    const heroLabel = document.querySelector('.hero-label');

    // Timeline for modern hero
    if (heroTitle) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(heroLabel, {
        opacity: 0,
        y: 20,
        filter: 'blur(5px)',
        duration: 0.8
      })
      .from(heroTitle, {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
        duration: 1,
        clearProps: 'filter'
      }, '-=0.4')
      .from(heroDescription, {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)',
        duration: 0.9,
        clearProps: 'filter'
      }, '-=0.6')
      .from(heroCTA, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.8
      }, '-=0.4');

      if (heroPhoto) {
        gsap.from(heroPhoto, {
          opacity: 0,
          scale: 0.95,
          rotate: -2,
          filter: 'blur(20px)',
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3,
          clearProps: 'filter'
        });

        // Parallax effect on hero photo
        gsap.to(heroPhoto, {
          scrollTrigger: {
            trigger: heroPhoto,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          },
          y: 100,
          scale: 1.05,
          ease: 'none'
        });
      }
    }

    // Legacy hero fallback
    const legacyTitle = document.querySelector('#banner-content h1');
    const legacySubtitle = document.querySelector('#banner-content h2');
    const legacyButton = document.querySelector('#banner-content .button');

    if (legacyTitle && !heroTitle) {
      gsap.from(legacyTitle, {
        opacity: 0,
        y: 50,
        filter: 'blur(8px)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
        clearProps: 'filter'
      });
    }

    if (legacySubtitle && !heroDescription) {
      gsap.from(legacySubtitle, {
        opacity: 0,
        y: 30,
        filter: 'blur(6px)',
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
        clearProps: 'filter'
      });
    }

    if (legacyButton && !heroCTA) {
      gsap.from(legacyButton, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.1
      });
    }
  }

  /**
   * Section reveal on scroll with blur-to-focus
   */
  function initSectionReveals() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      // Blur to focus animation
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power3.out'
      });

      // Parallax background effect
      const parallaxSpeed = -0.3;
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: (i, el) => {
          const height = el.offsetHeight;
          return height * parallaxSpeed;
        },
        ease: 'none'
      });
    });

    // Section headings with clip-path reveal + scale
    const sectionHeadings = document.querySelectorAll('.section-heading, .section-header');
    sectionHeadings.forEach(heading => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        clipPath: 'inset(0 100% 0 0)',
        scale: 0.95,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  }

  /**
   * Service cards staggered animation with variety
   */
  function initServiceCards() {
    // Try bento-card first (modern), fallback to icon-block (legacy)
    const cards = document.querySelectorAll('.bento-card, .icon-block');

    if (cards.length > 0) {
      // Staggered entrance with varying animations
      cards.forEach((card, index) => {
        // Alternate between different entrance effects
        const effects = [
          { y: 60, rotate: -5, filter: 'blur(8px)' },
          { y: 60, rotate: 5, filter: 'blur(8px)' },
          { y: 40, scale: 0.9, filter: 'blur(5px)' },
          { y: 50, x: -20, filter: 'blur(6px)' }
        ];
        const effect = effects[index % effects.length];

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true // Animation plays once and cards stay visible
          },
          opacity: 0,
          ...effect,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          clearProps: 'filter', // Clear filter after animation
          immediateRender: false // Don't apply initial state if already in view
        });

        // Floating animation on idle
        gsap.to(card, {
          y: -10,
          duration: 2 + (index * 0.3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      });

      // Icon animations
      const icons = document.querySelectorAll('.bento-card-icon, .icon-block .icon');
      icons.forEach((icon, index) => {
        // Subtle rotation on scroll
        gsap.to(icon, {
          scrollTrigger: {
            trigger: icon.closest('.bento-card, .icon-block'),
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
          },
          rotate: 15,
          ease: 'none'
        });

        // Pulsing scale on hover parent
        const parent = icon.closest('.bento-card, .icon-block');
        if (parent) {
          parent.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.15,
              rotate: 10,
              duration: 0.4,
              ease: 'back.out(2)'
            });
          });

          parent.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        }
      });
    }
  }

  /**
   * Floating interests grid with parallax
   */
  function initInterestsGrid() {
    const interestCards = document.querySelectorAll('.interest-card');

    interestCards.forEach((card, index) => {
      // Entrance animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card.parentElement,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        rotate: index % 2 === 0 ? -5 : 5,
        scale: 0.9,
        duration: 1,
        delay: index * 0.1,
        ease: 'back.out(1.5)'
      });

      // Parallax effect
      const speed = 0.5 + (index % 3) * 0.2;
      gsap.to(card, {
        scrollTrigger: {
          trigger: card.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: `${speed * 100}%`,
        ease: 'none'
      });
    });
  }

  /**
   * Scroll progress indicator
   */
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      },
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none'
    });
  }

  /**
   * Enhanced hover effects with GSAP
   */
  function initHoverEffects() {
    // Service cards 3D tilt
    const iconBlocks = document.querySelectorAll('.icon-block');
    iconBlocks.forEach(block => {
      block.addEventListener('mouseenter', function() {
        gsap.to(this, {
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      block.addEventListener('mouseleave', function() {
        gsap.to(this, {
          scale: 1,
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.button, .cta-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        gsap.to(this, {
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      });

      button.addEventListener('mouseleave', function() {
        gsap.to(this, {
          scale: 1,
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Reduce motion for accessibility
   */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable all GSAP animations
    gsap.globalTimeline.timeScale(100);
    // Disable Lenis smooth scroll
    lenis.destroy();
  }

})();
