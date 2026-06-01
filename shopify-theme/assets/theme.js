/* =============================================================
   One Product AI — Editorial Luxury Theme JS
   Modules: revealOnScroll · coachSimulator · timelineSpine
            faqAccordion (progressive enhancement) · faqCategoryJump
   ============================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    coachSimulator();
    timelineSpine();
    faqAccordion();
    faqCategoryJump();
  });

  /* ----------------------------------------------------------
     Reveal on scroll: add .is-in to .opa-reveal when in view
     ---------------------------------------------------------- */
  function revealOnScroll() {
    const els = document.querySelectorAll('.opa-reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     Coach Simulator: scenario chips → typed coach response
     ---------------------------------------------------------- */
  function coachSimulator() {
    const root = document.querySelector('[data-opa-sim]');
    if (!root) return;

    let scenarios = [];
    try {
      scenarios = JSON.parse(root.dataset.scenarios || '[]');
    } catch (e) {
      console.warn('Coach simulator: failed to parse scenarios', e);
      return;
    }
    if (!scenarios.length) return;

    const feed = root.querySelector('[data-opa-sim-feed]');
    const chipsHost = root.querySelector('[data-opa-sim-chips]');
    if (!feed || !chipsHost) return;

    scenarios.forEach((s, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'opa-sim__chip';
      chip.textContent = s.label;
      chip.dataset.idx = String(idx);
      chip.addEventListener('click', () => runScenario(s, chip));
      chipsHost.appendChild(chip);
    });

    let busy = false;

    function runScenario(scenario, chip) {
      if (busy) return;
      busy = true;
      chip.classList.add('is-used');

      const intro = feed.querySelector('.opa-sim__intro');
      if (intro) intro.remove();

      const userMsg = document.createElement('div');
      userMsg.className = 'opa-sim__msg opa-sim__msg--user';
      userMsg.textContent = scenario.user;
      feed.appendChild(userMsg);
      scrollFeed(feed);

      const typing = document.createElement('div');
      typing.className = 'opa-sim__typing';
      typing.innerHTML = '<span></span><span></span><span></span>';

      setTimeout(() => {
        feed.appendChild(typing);
        scrollFeed(feed);

        let i = 0;
        const lines = scenario.coach;
        const step = () => {
          if (i >= lines.length) {
            typing.remove();
            busy = false;
            return;
          }
          setTimeout(() => {
            const msg = document.createElement('div');
            msg.className = 'opa-sim__msg opa-sim__msg--coach';
            msg.textContent = lines[i];
            feed.insertBefore(msg, typing);
            scrollFeed(feed);
            i += 1;
            if (i >= lines.length) {
              typing.remove();
              busy = false;
            } else {
              step();
            }
          }, 900 + Math.random() * 400);
        };
        step();
      }, 700);
    }

    function scrollFeed(el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  /* ----------------------------------------------------------
     Timeline Spine: fill the vertical line as user scrolls
     ---------------------------------------------------------- */
  function timelineSpine() {
    const list = document.querySelector('[data-opa-timeline]');
    if (!list) return;
    const fill = list.querySelector('[data-opa-timeline-fill]');
    if (!fill) return;

    let ticking = false;
    const update = () => {
      const rect = list.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height;
      const start = winH * 0.6;
      const passed = start - rect.top;
      const pct = Math.max(0, Math.min(1, passed / total));
      fill.style.height = (pct * 100).toFixed(2) + '%';
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ----------------------------------------------------------
     FAQ Accordion: native <details> already handles toggle.
     This adds aria-expanded sync + smooth height (optional).
     ---------------------------------------------------------- */
  function faqAccordion() {
    const items = document.querySelectorAll('.opa-faq__item');
    items.forEach(item => {
      const summary = item.querySelector('.opa-faq__q');
      if (!summary) return;
      const sync = () => summary.setAttribute('aria-expanded', String(item.open));
      sync();
      item.addEventListener('toggle', sync);
    });
  }

  /* ----------------------------------------------------------
     FAQ Category Jump: mark active link based on scroll
     ---------------------------------------------------------- */
  function faqCategoryJump() {
    const nav = document.querySelector('.opa-faq__nav');
    if (!nav) return;
    const links = nav.querySelectorAll('a[href^="#faq-"]');
    if (!links.length) return;

    const targets = Array.from(links)
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4 });

    targets.forEach(t => io.observe(t));
  }
})();
