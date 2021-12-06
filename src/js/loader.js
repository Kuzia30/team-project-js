export const loader = document.querySelector(`.loader`);
window.addEventListener(`load`, stopScrolling);

function stopScrolling() {
  loader.classList.add(`slow`);
  loader.style.display = `none`;
}
