// scroll버튼
const body = document.querySelector('body');
const scroll_btn = document.querySelector('.scroll_btn');

scroll_btn.innerHTML = `
<div id="top_btn"><img src="./img/top_btn.png" alt="top_btn" /></div>
<div id="bottom_btn"><img src="./img/bottom_btn.png" alt="bottom_btn" /></div>
`;

window.addEventListener('scroll', function () {
  let y = window.pageYOffset;
  if (y > 0) {
    scroll_btn.style.display = 'block';
  } else {
    scroll_btn.style.display = 'none';
  }
});

const top_btn = document.querySelector('#top_btn');
const bottom_btn = document.querySelector('#bottom_btn');

top_btn.addEventListener('click', function () {
  scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
bottom_btn.addEventListener('click', function () {
  const endY = body.offsetHeight;
  scrollTo({ top: endY, left: 0, behavior: 'smooth' });
});
