(() => {
  const storedTheme = localStorage.getItem('wsnd-theme');
  const header = document.querySelector('.topbar');
  let menuToggle = header?.querySelector('.menu-toggle');
  let createdMenuToggle = false;
  if (!menuToggle && header) {
    menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.type = 'button';
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.textContent = '☰';
    header.querySelector('nav')?.before(menuToggle);
    createdMenuToggle = true;
  }
  if (createdMenuToggle) menuToggle?.addEventListener('click', () => header.querySelector('nav')?.classList.toggle('open'));
  let toggle = document.getElementById('themeToggle');
  if (!toggle && header) {
    const controls = document.createElement('div');
    controls.className = 'header-icons';
    controls.innerHTML = '<button id="themeToggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">◐</button>';
    header.append(controls);
    toggle = controls.querySelector('button');
  }
  const setTheme = (isDark) => {
    document.body.classList.toggle('night', isDark);
    toggle?.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem('wsnd-theme', isDark ? 'dark' : 'light');
  };
  setTheme(storedTheme === 'dark');
  if (toggle) toggle.onclick = null;
  toggle?.addEventListener('click', () => setTheme(!document.body.classList.contains('night')));
})();
