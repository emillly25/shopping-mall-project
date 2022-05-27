const menu = document.querySelector('.menu_header');
const container = document.querySelector('.container');
window.addEventListener('scroll', function () {
  let y = window.pageYOffset;
  if (y > 110) {
    menu.style.position = 'fixed';
    menu.style.zIndex = 100;
  } else {
    menu.style.position = 'relative';
  }
});

// scroll버튼
const body = document.querySelector('body');
const scroll_btn = document.querySelector('.scroll_btn');
const top_btn = document.querySelector('#top_btn');
const bottom_btn = document.querySelector('#bottom_btn');

window.addEventListener('scroll', function () {
  let y = window.pageYOffset;
  if (y > 0) {
    scroll_btn.style.display = 'block';
    top_btn.addEventListener('click', function () {
      scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    bottom_btn.addEventListener('click', function () {
      const endY = body.offsetHeight;
      scrollTo({ top: endY, left: 0, behavior: 'smooth' });
    });
  } else {
    scroll_btn.style.display = 'none';
  }
});

//dropdown menu
const dropmenu = document.querySelector('#dropmenu');
const dropdown = document.querySelector('.dropdown');

dropmenu.addEventListener('mouseenter', function () {
  dropdown.style.display = 'block';
});

dropmenu.addEventListener('mouseleave', function () {
  dropdown.style.display = 'none';
});
