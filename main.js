/* rizaptk.github.io — interaction layer. Content is HTML-first; nothing here is required to read the page. */

// 1) Scroll reveals: transform/opacity only, fires once. CSS keeps reduced motion safe.
(function () {
  const els = document.querySelectorAll('.hero > *, section > *:not(.reveal)');
  const show = el => { el.classList.add('reveal', 'is-in'); };
  if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
  const io = new IntersectionObserver(entries => {
    let k = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      e.target.style.transitionDelay = `${Math.min(k++, 5) * 60}ms`;
      requestAnimationFrame(() => show(e.target));
    }
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// 2) Sync diagram tabs (mesh over LAN / hub in the cloud).
(function () {
  const tabs = document.querySelectorAll('.tab[data-mode]');
  if (!tabs.length) return;
  const setMode = mode => {
    for (const t of tabs) {
      const on = t.dataset.mode === mode;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-pressed', String(on));
    }
    document.querySelectorAll('.net .m').forEach(g => g.classList.toggle('is-on', g.dataset.m === mode));
    document.querySelectorAll('.netcap').forEach(c => { c.hidden = c.dataset.mode !== mode; });
  };
  tabs.forEach(t => t.addEventListener('click', () => setMode(t.dataset.mode)));
})();
