/* ============================================
   MAIN JAVASCRIPT
   AB.Phano Book Marketing Website
   All references to calls removed.
   Email based communication only.
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       LOADING SCREEN
       ============================================ */
    function initLoadingScreen() {
        var loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        window.addEventListener('load', function () {
            setTimeout(function () {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
            }, 250);
        });

        setTimeout(function () {
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 1200);
    }

    /* ============================================
       NAVBAR SCROLL EFFECT
       ============================================ */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;

        function handleScroll() {
            if (window.pageYOffset > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /* ============================================
       MOBILE MENU
       ============================================ */
    function initMobileMenu() {
        var toggle = document.getElementById('mobileToggle');
        var navLinks = document.getElementById('navLinks');
        var overlay = document.getElementById('navOverlay');

        if (!toggle || !navLinks) return;

        function closeMenu() {
            navLinks.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (overlay) overlay.classList.remove('active');
        }

        function openMenu() {
            navLinks.classList.add('open');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            if (overlay) overlay.classList.add('active');
        }

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (navLinks.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        var links = navLinks.querySelectorAll('a');
        links.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    /* ============================================
       SCROLL REVEAL
       ============================================ */
    function initScrollReveal() {
        var elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        if (elements.length === 0) return;

        var threshold = 100;

        function check() {
            var windowHeight = window.innerHeight;
            elements.forEach(function (el) {
                var top = el.getBoundingClientRect().top;
                if (top < windowHeight - threshold && !el.classList.contains('active')) {
                    el.classList.add('active');
                }
            });
        }

        var timer = null;
        window.addEventListener('scroll', function () {
            if (timer !== null) clearTimeout(timer);
            timer = setTimeout(check, 15);
        }, { passive: true });

        window.addEventListener('resize', check, { passive: true });

        setTimeout(check, 200);
        setTimeout(check, 600);
    }

    /* ============================================
       BACK TO TOP
       ============================================ */
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        function handleVisibility() {
            if (window.pageYOffset > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', handleVisibility, { passive: true });

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        handleVisibility();
    }

    /* ============================================
       FAQ ACCORDION
       ============================================ */
    function initFaq() {
        var items = document.querySelectorAll('.faq-item');
        if (items.length === 0) return;

        items.forEach(function (item, index) {
            var btn = item.querySelector('.faq-question');
            var answer = item.querySelector('.faq-answer');
            if (!btn || !answer) return;

            var answerId = answer.id || 'faq-answer-' + (index + 1);
            var buttonId = btn.id || 'faq-question-' + (index + 1);
            answer.id = answerId;
            btn.id = buttonId;
            btn.setAttribute('aria-controls', answerId);
            answer.setAttribute('role', 'region');
            answer.setAttribute('aria-labelledby', buttonId);
            var initiallyActive = item.classList.contains('is-open');
            btn.setAttribute('aria-expanded', initiallyActive ? 'true' : 'false');
            answer.setAttribute('aria-hidden', initiallyActive ? 'false' : 'true');
            answer.inert = !initiallyActive;
            if (initiallyActive) answer.style.maxHeight = answer.scrollHeight + 40 + 'px';

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var isOpen = item.classList.contains('is-open');

                items.forEach(function (other) {
                    other.classList.remove('is-open');
                    var otherButton = other.querySelector('.faq-question');
                    var otherAnswer = other.querySelector('.faq-answer');
                    if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                        otherAnswer.setAttribute('aria-hidden', 'true');
                        otherAnswer.inert = true;
                    }
                });

                if (!isOpen) {
                    item.classList.add('is-open');
                    btn.setAttribute('aria-expanded', 'true');
                    answer.setAttribute('aria-hidden', 'false');
                    answer.inert = false;
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                }
            });
        });

        var resizeFrame = null;
        window.addEventListener('resize', function () {
            if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(function () {
                items.forEach(function (item) {
                    if (!item.classList.contains('is-open')) return;
                    var answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                });
                resizeFrame = null;
            });
        }, { passive: true });

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () {
                items.forEach(function (item) {
                    if (!item.classList.contains('is-open')) return;
                    var answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                });
            });
        }
    }

    /* ============================================
       LEAD MAGNET FORM
       (Uses Formspree)
       ============================================ */
    function initLeadMagnetForm() {
        var form = document.getElementById('leadMagnetForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var btn = form.querySelector('button[type="submit"]');
            var emailInput = form.querySelector('input[type="email"]');
            if (!btn || !emailInput) return;

            if (!emailInput.value.trim()) {
                emailInput.style.borderColor = 'var(--terracotta)';
                emailInput.focus();
                return;
            }

            var originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            var formData = new FormData(form);

            fetch(form.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                if (response.ok) {
                    btn.textContent = 'Check Your Inbox!';
                    btn.style.background = 'var(--sage-dark)';
                    form.reset();

                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 4000);
                } else {
                    btn.textContent = 'Something went wrong. Try again.';
                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 3000);
                }
            })
            .catch(function () {
                btn.textContent = 'Error. Please try again.';
                setTimeout(function () {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    /* ============================================
       CONTACT FORM
       (Uses Formspree)
       ============================================ */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var btn = form.querySelector('.form-submit-btn');
            if (!btn) return;

            var originalHTML = btn.innerHTML;

            // Validate required fields
            var requiredFields = form.querySelectorAll('[required]');
            var allValid = true;

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    allValid = false;
                    field.style.borderColor = 'var(--terracotta)';
                    field.addEventListener('input', function () {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (!allValid) {
                btn.style.animation = 'gentleBounce 0.5s ease';
                setTimeout(function () {
                    btn.style.animation = '';
                }, 500);
                return;
            }

            // Show loading
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Your Message...';
            btn.disabled = true;
            btn.style.opacity = '0.8';

            var formData = new FormData(form);

            fetch(form.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
                    btn.classList.add('success');
                    btn.style.opacity = '1';

                    setTimeout(function () {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('success');
                        btn.disabled = false;
                        form.reset();
                    }, 4000);
                } else {
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Something Went Wrong. Please Try Again.';
                    btn.style.opacity = '1';
                    setTimeout(function () {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                    }, 3500);
                }
            })
            .catch(function () {
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Network Error. Please Try Again.';
                btn.style.opacity = '1';
                setTimeout(function () {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 3500);
            });
        });

        // Focus animations
        var fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(function (field) {
            field.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });
            field.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    /* ============================================
       HERO BRAND ANIMATION
       ============================================ */
    function initHeroBrandAnimation() {
        var stage = document.getElementById('heroBrandAnimation');
        if (!stage || !window.gsap) return;

        var maskedGroup = stage.querySelector('#heroMaskedGroup');
        var maskCircles = stage.querySelectorAll('#heroCircleMask circle');
        var backgroundCircles = stage.querySelectorAll('.hero-animation-bg circle');
        var foreground = stage.querySelector('.hero-animation-fg');
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!maskedGroup || !foreground) return;

        var shadow = foreground.cloneNode(true);
        shadow.setAttribute('class', 'hero-animation-shadow');
        maskedGroup.insertBefore(shadow, foreground);

        var gridPositions = {
            cx: function (index) { return 200 + index % 3 * 200; },
            cy: function (index) { return 200 + Math.floor(index / 3) * 200; }
        };
        gsap.set(maskCircles, { attr: { r: 100 } });
        gsap.set(backgroundCircles, { attr: { r: 100 } });
        gsap.set(shadow, { attr: { filter: 'url(#heroShadowFilter)' } });
        gsap.set(shadow.querySelectorAll('circle'), {
            attr: { fill: '#000000bb', r: 95 },
            x: -5,
            y: 12
        });

        if (reducedMotion) {
            gsap.set(maskCircles, { attr: gridPositions });
            gsap.set(backgroundCircles, { attr: gridPositions });
            return;
        }

        gsap.fromTo([].slice.call(maskCircles).concat([].slice.call(backgroundCircles)), {
            attr: { cx: 400, cy: 400 }
        }, {
            attr: gridPositions,
            ease: 'expo.inOut',
            duration: 2.4
        });

        var animatedForeground = foreground.querySelectorAll('circle');
        var animatedShadow = shadow.querySelectorAll('circle');
        gsap.from([].slice.call(animatedForeground).concat([].slice.call(animatedShadow)), {
            duration: 2,
            y: function (index) { return index % 2 ? -200 : 200; },
            ease: 'steps(5)',
            repeat: -1,
            yoyo: true
        });

        var turbulence = stage.querySelector('feTurbulence');
        function animateNoise() {
            if (!stage.isConnected) return;
            gsap.set(turbulence, { attr: { seed: Math.ceil(Math.random() * 99) } });
            gsap.delayedCall(0.2, animateNoise);
        }
        animateNoise();

        stage.addEventListener('pointermove', function (event) {
            var bounds = stage.getBoundingClientRect();
            var pointerX = (event.clientX - bounds.left) / bounds.width;
            var pointerY = (event.clientY - bounds.top) / bounds.height;
            var horizontal = gsap.utils.wrapYoyo(0, 0.5, pointerX);
            var vertical = gsap.utils.wrapYoyo(0, 0.5, pointerY);

            gsap.to(maskCircles, {
                duration: 0.2,
                overwrite: 'auto',
                x: function (index) { return gsap.utils.interpolate(0, 400 - index % 3 * 400, horizontal); },
                y: function (index) { return gsap.utils.interpolate(0, 400 - Math.floor(index / 3) * 400, vertical); }
            });
            gsap.to(backgroundCircles, {
                duration: 0.2,
                overwrite: 'auto',
                x: function (index) { return gsap.utils.interpolate(0, 400 - index % 3 * 400, horizontal); },
                y: function (index) { return gsap.utils.interpolate(0, 400 - Math.floor(index / 3) * 400, vertical); }
            });
        });

        stage.addEventListener('pointerleave', function () {
            gsap.to([].slice.call(maskCircles).concat([].slice.call(backgroundCircles)), {
                duration: 1,
                x: 0,
                y: 0,
                overwrite: 'auto'
            });
        });
    }

    /* ============================================
       PARALLAX (Homepage Hero)
       ============================================ */
    function initParallax() {
        var heroContent = document.querySelector('.hero-content');
        var heroVisual = document.querySelector('.hero-visual');

        if (!heroContent && !heroVisual) return;

        function handleParallax() {
            var scrolled = window.pageYOffset;
            if (scrolled > 900) return;

            if (heroContent) {
                heroContent.style.transform = 'translateY(' + (scrolled * 0.08) + 'px)';
                heroContent.style.opacity = Math.max(0, 1 - (scrolled * 0.0008));
            }
            if (heroVisual) {
                heroVisual.style.transform = 'translateY(' + (scrolled * 0.04) + 'px)';
            }
        }

        window.addEventListener('scroll', function () {
            requestAnimationFrame(handleParallax);
        }, { passive: true });
    }

    /* ============================================
       COUNTER ANIMATION
       ============================================ */
    function initCounterAnimation() {
        var counters = document.querySelectorAll('.result-value, .hero-stat-value');
        if (counters.length === 0) return;

        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    entry.target.style.animation = 'countUp 0.8s ease forwards';
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    function initSmoothScroll() {
        document.addEventListener('click', function (e) {
            var target = e.target.closest('a[href^="#"]');
            if (!target) return;

            var href = target.getAttribute('href');
            if (!href || href === '#') return;

            var element = document.querySelector(href);
            if (!element) return;

            e.preventDefault();
            var offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    }

    /* ============================================
       ACTIVE NAV LINK
       ============================================ */
    function initActiveNavLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

        var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta-btn)');
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    /* ============================================
       CARD TILT EFFECT (Desktop)
       ============================================ */
    function initCardTilt() {
        if (window.innerWidth < 1024) return;

        var cards = document.querySelectorAll('.service-card, .testimonial-card, .why-card');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / 30;
                var rotateY = (centerX - x) / 30;
                this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    /* ============================================
       EXTERNAL LINKS
       ============================================ */
    function initExternalLinks() {
        var links = document.querySelectorAll('a[href^="http"]');
        links.forEach(function (link) {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    /* ============================================
       CURRENT YEAR
       ============================================ */
    function initCurrentYear() {
        var els = document.querySelectorAll('.current-year');
        var year = new Date().getFullYear();
        els.forEach(function (el) { el.textContent = year; });
    }

    /* ============================================
       REDUCED MOTION CHECK
       ============================================ */
    function checkReducedMotion() {
        var pref = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (pref.matches) {
            document.documentElement.style.setProperty('--transition-smooth', 'none');
            var allReveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            allReveals.forEach(function (el) {
                el.classList.add('active');
                el.style.transition = 'none';
            });
        }
    }

    /* ============================================
       KEYBOARD ACCESSIBILITY
       ============================================ */
    function initKeyboardAccess() {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
        });
        document.addEventListener('mousedown', function () {
            document.body.classList.remove('keyboard-nav');
        });
    }

    /* ABOUT PAGE LOGO REVEAL */
    function initAboutLogoReveal() {
        var logo = document.querySelector('.about-logo-wrap');
        if (!logo) return;
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) { logo.classList.add('is-visible'); return; }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { logo.classList.add('is-visible'); observer.disconnect(); }
            });
        }, { threshold: 0.25 });
        observer.observe(logo);
    }

    /* ============================================
       INIT ALL
       ============================================ */
    function init() {
        checkReducedMotion();
        initLoadingScreen();
        initNavbar();
        initMobileMenu();
        initScrollReveal();
        initBackToTop();
        initFaq();
        initLeadMagnetForm();
        initContactForm();
        initHeroBrandAnimation();
        initAboutLogoReveal();
        initParallax();
        initCounterAnimation();
        initSmoothScroll();
        initActiveNavLink();
        initCardTilt();
        initExternalLinks();
        initCurrentYear();
        initKeyboardAccess();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();