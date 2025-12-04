


(() => {
  'use strict';

  // Thème clair/sombre ES6+
  const KEY = 'theme';
  const LIGHT = 'light';
  const DARK = 'dark';
  const doc = document;
  const root = doc.documentElement;



    let user = {
    el: document.querySelector('#date'),
    date: new Date(),
    getDate() {
      if (this.el) {
        this.el.innerText += ` ${this.date.getFullYear()}`;
      } 
      else {
        console.error('Élément footer p introuvable');
      }
    }
  };

  user.getDate(); // on exécute la méthode (PAS besoin de console.log ici)
  console.warn(user.el);





/* 
  console.warn(user.getDate());
  el.textContent += footer_date;
 */
  const getSaved = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };

  const hasSaved = () => {
    const t = getSaved();
    return t === LIGHT || t === DARK;
  };

  const currentTheme = () => {
    const t = getSaved();
    if (t === LIGHT || t === DARK) return t;
    return LIGHT; // défaut clair si pas de choix
  };

  const applyTheme = (t) => {
    if (t === DARK) root.classList.add('dark'); else root.classList.remove('dark');
    // Mettre à jour theme-color si pas de couple light/dark avec media
    const hasMediaMeta = !!doc.querySelector('meta[name="theme-color"][media*="light"]') && !!doc.querySelector('meta[name="theme-color"][media*="dark"]');
    if (!hasMediaMeta) {
      const meta = doc.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', t === DARK ? '#0b0b0b' : '#ffffff');
    }
    // Mettre à jour l'UI du bouton
    const btn = doc.getElementById('theme-toggle');
    if (btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = t === DARK ? 'light_mode' : 'dark_mode';
      btn.setAttribute('aria-label', t === DARK ? 'Activer le mode clair' : 'Activer le mode sombre');
      btn.title = t === DARK ? 'Basculer vers le mode clair' : 'Basculer vers le mode sombre';
    }
  };

  const setTheme = (t, persist = true) => {
    applyTheme(t);
    if (persist) {
      try { localStorage.setItem(KEY, t); } catch {}
    }
  };

  // Synchroniser l'état du bouton sur le DOM prêt (la classe dark peut être déjà posée par le script <head>)
  doc.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.classList.contains('dark') ? DARK : LIGHT);
  });

  // Bascule via délégation de clic (fiable même si le bouton est réinséré)
  doc.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? LIGHT : DARK, true);
  });
  
  // --------- Menu mobile (ES6+) ---------
  const menu = () => doc.getElementById('mobile-menu');
  const navBtn = () => doc.getElementById('nav-toggle');

  const openMenu = () => {
    const m = menu(); const b = navBtn();
    if (!m || !b) return;
    // Calcule la hauteur de l'entête pour positionner le menu
    const header = doc.querySelector('header');
    const h = header ? Math.round(header.getBoundingClientRect().height) : 56;
    m.style.setProperty('--header-offset', h + 'px');
    m.classList.add('open');
    b.setAttribute('aria-expanded', 'true');
    const icon = b.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'close';
    doc.body.classList.add('no-scroll');
    const backdrop = doc.getElementById('mobile-backdrop');
    if (backdrop) { backdrop.hidden = false; backdrop.classList.add('open'); }
  };

  const closeMenu = () => {
    const m = menu(); const b = navBtn();
    if (!m || !b) return;
    m.classList.remove('open');
    b.setAttribute('aria-expanded', 'false');
    const icon = b.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'menu';
    doc.body.classList.remove('no-scroll');
    const backdrop = doc.getElementById('mobile-backdrop');
    if (backdrop) { backdrop.classList.remove('open'); setTimeout(()=>{ backdrop.hidden = true; }, 200); }
  };

  const toggleMenu = () => {
    const m = menu();
    if (!m) return;
    m.classList.contains('open') ? closeMenu() : openMenu();
  };

  // Clicks
  doc.addEventListener('click', (e) => {
    // Toggle button
    const tgl = e.target.closest('#nav-toggle');
    if (tgl) { toggleMenu(); return; }
    // Close when clicking a link inside menu
    const link = e.target.closest('#mobile-menu a');
    if (link) { closeMenu(); return; }
    // Click outside menu or on backdrop closes it
    const m = menu();
    if (m && m.classList.contains('open')) {
      const clickInMenu = e.target.closest('#mobile-menu');
      const clickOnBtn = e.target.closest('#nav-toggle');
      const onBackdrop = e.target.closest('#mobile-backdrop');
      if (onBackdrop || (!clickInMenu && !clickOnBtn)) closeMenu();
    }
  });

  // Escape key closes the menu
  doc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Fermer le menu si on passe en desktop (≥768px)
  const mqDesktop = window.matchMedia('(min-width: 1000px)');
  if (mqDesktop && mqDesktop.addEventListener) {
    mqDesktop.addEventListener('change', (e) => { if (e.matches) closeMenu(); });
  }

  // Recalcule la position du menu à chaque redimensionnement si ouvert
  window.addEventListener('resize', () => {
    const m = menu();
    if (m && m.classList.contains('open')) {
      const header = doc.querySelector('header');
      const h = header ? Math.round(header.getBoundingClientRect().height) : 56;
      m.style.setProperty('--header-offset', h + 'px');
    }
  });
     (()=>{
        try {
          let saved = localStorage.getItem('theme');
          let theme = saved || 'light'; // défaut: clair
          let d = document.documentElement;
          if (theme === 'dark') d.classList.add('dark'); else d.classList.remove('dark');
        } catch (e) { /* ignore */ }
      })();

    
   
})();
