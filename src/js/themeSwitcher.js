const switcherThemeEl = document.querySelector('#theme-switch-toggle');
const THEME = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (localStorage.getItem('ui-theme') === 'light') {
  switcherThemeEl.checked = false;
  lightThemeOn();
} else if (localStorage.getItem('ui-theme') === 'dark') {
  switcherThemeEl.checked = true;
  darkThemeOn();
}

switcherThemeEl.addEventListener('click', themeSwitch);

function themeSwitch(evt) {
  if (evt.target.checked) {
    darkThemeOn();
    localStorage.setItem('ui-theme', 'dark');
  } else {
    lightThemeOn();
    localStorage.setItem('ui-theme', 'light');
  }
}

function lightThemeOn() {
  document.body.classList.add(THEME.LIGHT);
  document.body.classList.remove(THEME.DARK);
}
function darkThemeOn() {
  document.body.classList.add(THEME.DARK);
  document.body.classList.remove(THEME.LIGHT);
}
