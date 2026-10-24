(() => {
  const storedTheme = localStorage.getItem('wsnd-theme');
  const header = document.querySelector('.topbar');
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
