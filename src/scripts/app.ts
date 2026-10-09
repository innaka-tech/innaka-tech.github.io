import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'expo.out';

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;

function initLenis() {
  if (reduceMotion) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links → smooth scroll
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      lenis?.scrollTo(target, { offset: 0, duration: 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
      history.pushState(null, '', id);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Split text (words) — dipakai oleh [data-split]                       */
/* ------------------------------------------------------------------ */
function splitWords(el: HTMLElement) {
  // Bungkus setiap kata (termasuk yang di dalam <span> inline) menjadi
  // .word > span supaya bisa dianimasikan dari bawah dengan mask.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const text = node.textContent ?? '';
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    const parts = text.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(' '));
        return;
      }
      const w = document.createElement('span');
      w.className = 'word';
      const inner = document.createElement('span');
      inner.textContent = part;
      w.appendChild(inner);
      frag.appendChild(w);
    });
    node.parentNode?.replaceChild(frag, node);
  });
  return el.querySelectorAll<HTMLElement>('.word > span');
}

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */
function initPreloader(): Promise<void> {
  const pre = document.getElementById('preloader');
  if (!pre) return Promise.resolve();
  if (reduceMotion) {
    pre.remove();
    return Promise.resolve();
  }

  lenis?.stop();
  document.documentElement.classList.add('lenis-stopped');
  const count = document.getElementById('preloader-count')!;
  const obj = { v: 0 };

  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          pre.remove();
          lenis?.start();
          document.documentElement.classList.remove('lenis-stopped');
          resolve();
        },
      })
      .to(obj, {
        v: 100,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => (count.textContent = String(Math.round(obj.v))),
      })
      .to(count, { yPercent: -20, opacity: 0, duration: 0.5, ease: 'power3.in' }, '-=0.2')
      .to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.3');
  });
}

/* ------------------------------------------------------------------ */
/* Reveals                                                             */
/* ------------------------------------------------------------------ */
/**
 * Menyiapkan semua animasi reveal. Elemen di atas lipatan (hero / halaman
 * tanpa scroll) dikumpulkan ke satu timeline yang dikembalikan dalam keadaan
 * pause, supaya bisa dimainkan tepat setelah preloader selesai.
 */
function initReveals(): gsap.core.Timeline {
  const intro = gsap.timeline({ paused: true });
  const isIntro = (el: HTMLElement) => el.closest('#top, main > .container-x:first-child') !== null;

  // Split headings
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    if (reduceMotion) return;
    const delay = parseFloat(el.dataset.splitDelay ?? '0');
    const vars: gsap.TweenVars = { y: 0, opacity: 1, duration: 1.2, ease: EASE, stagger: 0.045 };

    if (isIntro(el)) intro.to(words, vars, delay);
    else gsap.to(words, { ...vars, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // Single reveals
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (reduceMotion) return;
    const delay = parseFloat(el.dataset.revealDelay ?? '0');
    const vars: gsap.TweenVars = { y: 0, opacity: 1, duration: 1.1, ease: EASE };

    if (isIntro(el)) intro.to(el, vars, delay);
    else gsap.to(el, { ...vars, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  // Staggered children
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((el) => {
    if (reduceMotion) return;
    gsap.to(el.children, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  return intro;
}

/* ------------------------------------------------------------------ */
/* Hero parallax                                                      */
/* ------------------------------------------------------------------ */
function initHero() {
  if (reduceMotion) return;
  const hero = document.getElementById('top');
  if (!hero) return;
  const orb = hero.querySelector('.hero-orb');
  const h1 = hero.querySelector('h1');

  if (orb) {
    gsap.to(orb, {
      x: '+=60',
      y: '+=40',
      duration: 9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
  gsap.to([h1, orb], {
    yPercent: (i) => (i === 0 ? 18 : 30),
    opacity: (i) => (i === 0 ? 0.3 : 0.2),
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

function openMenu() {
  if (!mobileMenu || !menuBtn) return;
  menuOpen = true;
  mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Tutup menu');
  mobileMenu.querySelectorAll<HTMLElement>('.menu-item a').forEach((a) => a.classList.remove('translate-y-full'));
  const [l1, l2] = menuBtn.querySelectorAll<HTMLElement>('.menu-line');
  l1.style.transform = 'rotate(45deg)';
  l2.style.transform = 'rotate(-45deg)';
  lenis?.stop();
}
function closeMenu() {
  if (!mobileMenu || !menuBtn || !menuOpen) return;
  menuOpen = false;
  mobileMenu.classList.add('pointer-events-none', 'opacity-0');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Buka menu');
  mobileMenu.querySelectorAll<HTMLElement>('.menu-item a').forEach((a) => a.classList.add('translate-y-full'));
  const [l1, l2] = menuBtn.querySelectorAll<HTMLElement>('.menu-line');
  l1.style.transform = '';
  l2.style.transform = '';
  lenis?.start();
}

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const bg = nav.querySelector<HTMLElement>('.nav-bg');

  menuBtn?.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

  let lastY = window.scrollY;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      const scrolled = y > 40;
      bg?.classList.toggle('bg-ink/70', scrolled);
      bg?.classList.toggle('backdrop-blur-md', scrolled);
      bg?.classList.toggle('border-line', scrolled);

      const goingDown = y > lastY && y > 200;
      nav.style.transform = goingDown && !menuOpen ? 'translateY(-100%)' : 'translateY(0)';
      lastY = y;
    },
  });

  // Light-section awareness: nav text flips when over [data-theme-light]
  document.querySelectorAll<HTMLElement>('[data-theme-light]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 40px',
      end: 'bottom 40px',
      onToggle: (self) => nav.classList.toggle('nav-on-light', self.isActive),
    });
  });
}

/* ------------------------------------------------------------------ */
/* Stacking service cards                                              */
/* ------------------------------------------------------------------ */
function initStack() {
  if (reduceMotion) return;
  const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]');
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    const next = cards[i + 1];
    gsap.to(card, {
      scale: 0.94,
      opacity: 0.55,
      filter: 'blur(2px)',
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: {
        trigger: next,
        start: 'top bottom',
        end: 'top top+=100',
        scrub: true,
      },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Counters                                                            */
/* ------------------------------------------------------------------ */
function initCounters() {
  if (reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '0');
    const obj = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        }),
    });
  });
}

/* ------------------------------------------------------------------ */
/* Process line                                                        */
/* ------------------------------------------------------------------ */
function initProcess() {
  if (reduceMotion) return;
  const list = document.getElementById('process-list');
  if (!list) return;
  gsap.to(list.querySelector('.process-line'), {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: true },
  });
  gsap.utils.toArray<HTMLElement>('.process-item').forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      x: 24,
      duration: 1,
      ease: EASE,
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Parallax helpers                                                    */
/* ------------------------------------------------------------------ */
function initParallax() {
  if (reduceMotion) return;
  const word = document.querySelector('[data-footer-word]');
  if (word) {
    gsap.from(word, {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: { trigger: word, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }
  const orb = document.querySelector('.cta-orb');
  if (orb) {
    gsap.fromTo(
      orb,
      { scale: 0.6 },
      { scale: 1.1, ease: 'none', scrollTrigger: { trigger: '#kontak', start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  }
}

/* ------------------------------------------------------------------ */
/* Magnetic buttons                                                    */
/* ------------------------------------------------------------------ */
function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: EASE });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: EASE });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */
function initCursor() {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (!finePointer || reduceMotion) {
    dot.remove();
    ring.remove();
    return;
  }
  document.documentElement.classList.add('has-cursor');
  const label = ring.querySelector('span')!;

  const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

  gsap.set([dot, ring], { xPercent: 0, yPercent: 0, opacity: 0 });
  let shown = false;

  window.addEventListener('mousemove', (e) => {
    if (!shown) {
      shown = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    }
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  });
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));

  const setState = (state: string | null) => {
    switch (state) {
      case 'hide':
        gsap.to(ring, { width: 0, height: 0, duration: 0.4, ease: EASE });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        break;
      case 'small':
        gsap.to(ring, { width: 56, height: 56, duration: 0.4, ease: EASE });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
        break;
      case 'view':
        label.textContent = 'VIEW';
        ring.classList.add('is-label');
        gsap.to(ring, { width: 88, height: 88, duration: 0.4, ease: EASE });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        break;
      default:
        ring.classList.remove('is-label');
        gsap.to(ring, { width: 40, height: 40, duration: 0.4, ease: EASE });
        gsap.to(dot, { scale: 1, duration: 0.3 });
    }
  };

  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => setState(el.dataset.cursor ?? null));
    el.addEventListener('mouseleave', () => setState(null));
  });
}

/* ------------------------------------------------------------------ */
/* Contact form (Web3Forms)                                            */
/* ------------------------------------------------------------------ */
function initForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const key = (form.elements.namedItem('access_key') as HTMLInputElement).value;
    if (!key) {
      status.textContent = 'Form belum aktif — hubungi kami via WhatsApp atau email.';
      return;
    }
    const btn = form.querySelector('button[type=submit]') as HTMLButtonElement;
    btn.disabled = true;
    status.textContent = 'Mengirim…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (data.success) {
        form.reset();
        status.textContent = 'Terkirim. Kami akan segera menghubungi Anda.';
      } else throw new Error(data.message);
    } catch {
      status.textContent = 'Gagal mengirim. Coba lagi atau hubungi via WhatsApp.';
    } finally {
      btn.disabled = false;
    }
  });
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  initLenis();
  initCursor();
  initNav();
  initMagnetic();
  initForm();

  // Siapkan reveal dulu (teks tersembunyi), mainkan intro setelah preloader
  const intro = initReveals();
  await initPreloader();
  intro.play();

  initHero();
  initStack();
  initCounters();
  initProcess();
  initParallax();

  // Fonts load → layout may shift; refresh triggers
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

boot();
