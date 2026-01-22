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
  });

  /**
   * Hero section entrance animations
   */
  function initHeroAnimations() {
    const heroTitle = document.querySelector('#banner-content h1');
    const heroSubtitle = document.querySelector('#banner-content h2');
    const heroButton = document.querySelector('#banner-content .button');

    if (heroTitle) {
      gsap.from(heroTitle, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
    }

    if (heroSubtitle) {
      gsap.from(heroSubtitle, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });
    }

    if (heroButton) {
      gsap.from(heroButton, {
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
   * Section reveal on scroll
   */
  function initSectionReveals() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Section headings with clip-path reveal
    const sectionHeadings = document.querySelectorAll('.section-heading');
    sectionHeadings.forEach(heading => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  }

  /**
   * Service cards staggered animation
   */
  function initServiceCards() {
    const iconBlocks = document.querySelectorAll('.icon-block');

    if (iconBlocks.length > 0) {
      gsap.from(iconBlocks, {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.5)'
      });

      // Icon rotation on scroll
      iconBlocks.forEach(block => {
        const icon = block.querySelector('.icon');
        if (icon) {
          gsap.to(icon, {
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1
            },
            rotate: 360,
            ease: 'none'
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
