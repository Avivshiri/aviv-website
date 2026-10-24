const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
root.classList.add('js');

// Theme toggle: follows the OS until the visitor picks one
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Highlight the nav link of the section in view
const links = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
const setActive = () => {
  const atBottom = root.scrollHeight - innerHeight - scrollY < 4;
  let current = -1;
  sections.forEach((sec, i) => { if (sec.getBoundingClientRect().top < innerHeight * 0.45) current = i; });
  if (atBottom) current = sections.length - 1;
  links.forEach((a, i) => a.classList.toggle('active', i === current));
};

// Scroll progress bar
const progress = document.querySelector('.progress');
const onScroll = () => {
  const max = root.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  setActive();
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll, staggered within each group
document.querySelectorAll('.section h2, .item, .stats > div, .quotes p, .cols > div, .contact a, .logos')
  .forEach((el) => {
    el.classList.add('reveal');
    const siblings = [...el.parentElement.children];
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 80}ms`;
  });

const revealer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealer.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

// Count-up stats
const counter = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    const el = e.target;
    const { count, prefix = '', suffix = '' } = el.dataset;
    if (reduceMotion) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(count * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach((el) => counter.observe(el));

// Logo marquee: duplicate the list so the loop is seamless
const list = document.querySelector('.logos__list');
const inner = document.createElement('div');
inner.className = 'logos__inner';
list.replaceWith(inner);
const copy = list.cloneNode(true);
copy.setAttribute('aria-hidden', 'true');
inner.append(list, copy);

// Hero background: drifting network of nodes
const canvas = document.querySelector('.hero__bg');
const ctx = canvas.getContext('2d');
let nodes = [];
let width = 0;
let height = 0;
let running = false;

const resize = () => {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // ponytail: node count scales with area, capped at 70 so the O(n²) link pass stays cheap
  const count = Math.min(70, Math.round((width * height) / 16000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
};

const draw = () => {
  const color = getComputedStyle(root).getPropertyValue('--accent').trim();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  }
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.globalAlpha = (1 - d / 130) * 0.25;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (running) requestAnimationFrame(draw);
};

resize();
addEventListener('resize', resize);
if (reduceMotion) {
  draw();
} else {
  // only animate while the hero is on screen
  new IntersectionObserver(([e]) => {
    const wasRunning = running;
    running = e.isIntersecting;
    if (running && !wasRunning) requestAnimationFrame(draw);
  }).observe(canvas);
}
