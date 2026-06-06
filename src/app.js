/* ============================================================================
   Canary C01 — landing page behaviour (vanilla, no framework / no transpile).
   Replaces the previous React-CDN + Babel + Tweaks-panel build for the public
   page. Preserves the canaryTrack analytics seam and the /api/subscribe form
   contract exactly.
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     canaryTrack — single analytics seam (ported verbatim from tweaks-host.js).
     Mirrors to a debug buffer + dataLayer, and forwards to gtag when present.
     -------------------------------------------------------------------------- */
  window.canaryEvents = window.canaryEvents || [];
  window.canaryTrack = window.canaryTrack || function (name, params) {
    var payload = Object.assign({ event: name }, params || {});
    try { window.canaryEvents.push(payload); } catch (e) {}
    try { (window.dataLayer = window.dataLayer || []).push(payload); } catch (e) {}
    if (typeof window.gtag === 'function') {
      try { window.gtag('event', name, params || {}); } catch (e) {}
    }
    // TODO(pixels): forward to Meta Pixel (fbq) / TikTok Pixel (ttq) here.
  };

  var ready = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  ready(function () {
    /* ---- reveal on scroll ------------------------------------------------ */
    var revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { ro.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---- sticky header state + active section -------------------------- */
    var header = document.querySelector('.site-header');
    var onScroll = function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    var sections = navLinks
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { so.observe(s); });
    }

    /* ---- mobile nav ----------------------------------------------------- */
    var toggle = document.querySelector('.nav-toggle');
    var closeNav = function () { document.body.classList.remove('nav-open'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); };
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = document.body.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    document.querySelectorAll('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    /* ---- CTA analytics hooks ------------------------------------------- */
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.canaryTrack(el.getAttribute('data-track'), { source: el.getAttribute('data-source') || 'cta' });
      });
    });

    /* ---- colorway pick — swaps the hero scene; cards also jump to Join -- */
    var heroImg = document.querySelector('.hero-bg img');
    var heroBaseSrc = heroImg ? heroImg.getAttribute('src') : '';
    function setHeroColorway(cw) {
      if (!heroImg) return;
      var src = 'assets/keyboards/c01-scene-' + cw.toLowerCase() + '.png';
      // Preload first: only swap if the per-colorway asset exists, otherwise
      // keep the current scene (no broken image while those renders are pending).
      var pre = new Image();
      pre.onload = function () {
        heroImg.style.opacity = '0';
        setTimeout(function () { heroImg.src = src; heroImg.style.opacity = ''; }, 180);
      };
      pre.src = src; // onerror path: silently keep heroBaseSrc
    }
    document.querySelectorAll('[data-pick-colorway]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cw = btn.getAttribute('data-pick-colorway');
        var inSwitch = btn.closest('.cw-switch');
        var sel = document.getElementById('flock-colorway');
        if (sel) {
          var ok = Array.prototype.some.call(sel.options, function (o) { return o.value === cw; });
          sel.value = ok ? cw : 'Not sure yet';
        }
        window.canaryTrack('colorway_select', { colorway: cw, source: inSwitch ? 'hero_switch' : 'colorway_card' });
        setHeroColorway(cw);
        if (inSwitch) {
          inSwitch.querySelectorAll('button[data-pick-colorway]').forEach(function (b) {
            b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
          });
        } else {
          var join = document.getElementById('join');
          if (join) join.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ---- switch comparison chart (acoustic signatures) ----------------- */
    var switchToggle = document.querySelector('.switch-toggle');
    var switchCards = document.querySelectorAll('.switch-card');
    function selectSwitch(key) {
      document.querySelectorAll('.switch-toggle button').forEach(function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-switch') === key ? 'true' : 'false');
      });
      switchCards.forEach(function (c) {
        c.classList.toggle('is-active', c.getAttribute('data-switch-card') === key);
      });
      window.canaryTrack('switch_compare_select', { 'switch': key });
    }
    if (switchToggle) {
      switchToggle.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-switch]');
        if (b) selectSwitch(b.getAttribute('data-switch'));
      });
    }
    switchCards.forEach(function (c) {
      var activate = function () { selectSwitch(c.getAttribute('data-switch-card')); };
      c.addEventListener('click', activate);
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    /* ---- film modal (lazy: src injected only on open) ------------------ */
    var filmModal = document.querySelector('.film-modal');
    var filmVideo = filmModal && filmModal.querySelector('video');
    var openFilm = function () {
      if (!filmModal || !filmVideo) return;
      if (!filmVideo.getAttribute('src')) filmVideo.setAttribute('src', 'assets/canary-video.mp4');
      filmModal.classList.add('open');
      filmModal.setAttribute('aria-hidden', 'false');
      filmVideo.play().catch(function () {});
      window.canaryTrack('film_open', {});
    };
    var closeFilm = function () {
      if (!filmModal || !filmVideo) return;
      filmVideo.pause();
      filmModal.classList.remove('open');
      filmModal.setAttribute('aria-hidden', 'true');
    };
    document.querySelectorAll('[data-film-open]').forEach(function (b) { b.addEventListener('click', openFilm); });
    if (filmModal) {
      filmModal.addEventListener('click', function (e) { if (e.target === filmModal) closeFilm(); });
      var fc = filmModal.querySelector('.film-close');
      if (fc) fc.addEventListener('click', closeFilm);
      filmVideo.addEventListener('ended', closeFilm);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeFilm(); closeNav(); }
    });

    /* ---- FAQ analytics on <details> open ------------------------------- */
    document.querySelectorAll('.faq-item').forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) {
          var q = d.querySelector('summary');
          window.canaryTrack('faq_expand', { question: q ? q.textContent.trim().slice(0, 80) : '' });
        }
      });
    });

    /* ---- waitlist form -------------------------------------------------- */
    var form = document.getElementById('flock-form');
    if (form) wireForm(form);
  });

  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  function wireForm(form) {
    var emailEl   = form.querySelector('input[name="email"]');
    var companyEl = form.querySelector('input[name="company"]'); // honeypot
    var colorEl   = form.querySelector('#flock-colorway');
    var useEl     = form.querySelector('#flock-usecase');
    var msgEl     = form.querySelector('.flock-msg');
    var btnEl     = form.querySelector('button[type="submit"]');
    var rowEl     = form.querySelector('.flock-row');
    var microEl   = form.querySelector('.flock-micro');
    var enrichEl  = form.querySelector('.flock-enrich');
    var source    = form.getAttribute('data-source') || 'capture';
    var viewed    = false;
    var submitted = false;
    var savedEmail = '';

    // fire waitlist_view once when the form is seen
    if ('IntersectionObserver' in window) {
      var vo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !viewed) {
            viewed = true;
            window.canaryTrack('waitlist_view', { source: source });
            vo.disconnect();
          }
        });
      }, { threshold: 0.4 });
      vo.observe(form);
    }

    // Secondary profile enrichment — only sent once the email is subscribed.
    // Tagged with its own source so the ESP can update properties, not re-add.
    function sendEnrichment() {
      if (!submitted || !savedEmail) return;
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: savedEmail, company: '', source: 'profile_enrichment',
          colorway: colorEl ? colorEl.value : '', useCase: useEl ? useEl.value : '', social: ''
        })
      }).catch(function () {});
    }

    // qualifying-field analytics (+ enrichment once subscribed)
    if (colorEl) colorEl.addEventListener('change', function () {
      if (colorEl.value) { window.canaryTrack('colorway_select', { colorway: colorEl.value, source: source }); sendEnrichment(); }
    });
    if (useEl) useEl.addEventListener('change', function () {
      if (useEl.value) { window.canaryTrack('use_case_select', { use_case: useEl.value, source: source }); sendEnrichment(); }
    });

    var setMsg = function (text, state) {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.setAttribute('data-state', state || '');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitted) return;
      var email = (emailEl.value || '').trim();
      if (!EMAIL_RE.test(email)) { setMsg('Check your email address.', 'err'); emailEl.focus(); return; }

      btnEl.disabled = true;
      var orig = btnEl.innerHTML;
      btnEl.textContent = 'Sending…';
      setMsg('', '');

      // Step 1 — email only. Preferences are captured later as enrichment.
      var payload = {
        email: email, company: companyEl ? companyEl.value : '',
        source: source, colorway: '', useCase: '', social: ''
      };

      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (resp) { return resp.json().catch(function () { return {}; }).then(function (data) { return { ok: resp.ok, data: data }; }); })
        .then(function (r) {
          if (!r.ok || !r.data.ok) { throw new Error('bad_response'); }
          submitted = true; savedEmail = email;
          window.canaryTrack('waitlist_submit', { source: source });
          window.canaryTrack('generate_lead', { method: 'the_flock', source: source, value: 1, currency: 'USD' });

          // Confirm, then reveal the optional preference step (progressive disclosure).
          var box = document.createElement('div');
          box.className = 'flock-success';
          box.setAttribute('role', 'status');
          box.innerHTML =
            '<div class="fs-label">Confirmed · The Flock</div>' +
            '<h3>You’re in the flock.</h3>' +
            '<p>Capsule 01 details arrive before the public drop. Watch ' + escapeHtml(email) + '.</p>';
          if (rowEl) rowEl.replaceWith(box);
          if (microEl) microEl.remove();
          if (enrichEl) { enrichEl.hidden = false; }
        })
        .catch(function () {
          btnEl.disabled = false;
          btnEl.innerHTML = orig;
          setMsg('Something went wrong. Try again.', 'err');
        });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
