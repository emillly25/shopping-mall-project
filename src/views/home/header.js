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

// 로그인 상태 : '계정관리' , '로그아웃' 보여주기
// 비로그인 상태 : '회원가입' , '로그인' 보여주기

const info_menu = document.querySelector('.info_menu');
const user = sessionStorage.getItem('token');
console.log('user의 token : ', user);
if (user) {
  if (info_menu.hasChildNodes()) {
    let children = info_menu.children;
    for (let i = 0; i < 4; i++) {
      if (children[i].classList.contains('show')) {
        children[i].classList.remove('show');
        children[i].classList.add('none');
      } else {
        children[i].classList.remove('none');
        children[i].classList.add('show');
      }
    }
  }
  // console.log(info_menu.children);
}

// 로그아웃
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }
});
