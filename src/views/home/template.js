// header.js
const headerEl = document.querySelector('header');
headerEl.innerHTML = `
<nav class="navbar" role="navigation" aria-label="main navigation">
<div class="info_header">
  <div class="info_logo">
    <a href=""><h1>Book Store 7</h1></a>
  </div>
</div>

<div class="menu_header">
  <ul class="category">
    <li id="dropmenu">
      <a href="" id="li_hover">국내도서</a>
      <ul class="dropdown">
        <li><a href="">소설</a></li>
        <li><a href="">경영/경제</a></li>
        <li><a href="">에세이</a></li>
      </ul>
    </li>
    <li><a href="" id="li_hover">해외도서</a></li>
    <li><a href="" id="li_hover">eBook</a></li>
    <li><a href="" id="li_hover">음반</a></li>
    <li><a href="" id="li_hover">이벤트</a></li>
  </ul>
  <div class="search_bar_info_menu">
    <div class="search_bar">
      <input class="searchInput" type="search" placeholder="검색" />
      <div id="searching">
        <a href=""><i class="fa-solid fa-magnifying-glass"></i></a>
      </div>
    </div>

    <ul class="info_menu">
      <li class="show"><a href="/register">회원가입</a></li>
      <li class="show"><a href="/login">로그인</a></li>
      <li class="none"><a href="/account">계정관리</a></li>
      <li class="none"><a href="" id="logout">로그아웃</a></li>
      <li>
        <a href=""><i class="fa-solid fa-user"></i></a>
      </li>
      <li>
        <div id="cart">
          <div id="cart_badge">0</div>
          <a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
      </li>
      <li>
        <a href=""><i class="fa-solid fa-heart"></i></a>
      </li>
    </ul>
  </div>
</div>
</nav>
`;

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
    alert('로그아웃 되었습니다.');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }
});

export const insertHeader = () => {
  const header = document.querySelector('header');
  let headerTag = `<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="info_header">
    <div class="info_logo">
      <a href=""><h1>Book Store 7</h1></a>
    </div>
  </div>

  <div class="menu_header">
    <ul class="category">
      <li id="dropmenu">
        <a href="" id="li_hover">국내도서</a>
        <ul class="dropdown">
          <li><a href="">소설</a></li>
          <li><a href="">경영/경제</a></li>
          <li><a href="">에세이</a></li>
        </ul>
      </li>
      <li><a href="" id="li_hover">해외도서</a></li>
      <li><a href="" id="li_hover">eBook</a></li>
      <li><a href="" id="li_hover">음반</a></li>
      <li><a href="" id="li_hover">이벤트</a></li>
    </ul>
    <div class="search_bar_info_menu">
      <div class="search_bar">
        <input class="searchInput" type="search" placeholder="검색" />
        <div id="searching">
          <a href=""><i class="fa-solid fa-magnifying-glass"></i></a>
        </div>
      </div>

      <ul class="info_menu">
        <li class="show"><a href="/register">회원가입</a></li>
        <li class="show"><a href="/login">로그인</a></li>
        <li class="none"><a href="/account">계정관리</a></li>
        <li class="none"><a href="" id="logout">로그아웃</a></li>
        <li>
          <a href=""><i class="fa-solid fa-user"></i></a>
        </li>
        <li>
          <div id="cart">
            <div id="cart_badge">0</div>
            <a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a>
          </div>
        </li>
        <li>
          <a href=""><i class="fa-solid fa-heart"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
  header.insertAdjacentElement('beforebegin', headerTag);
};

// scrollBtn.js

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

// footer.js

const footerEl = document.querySelector('footer');
footerEl.innerHTML = `
<div class="first">
<a href="#">Index</a>
<nav>
  <a href="www.google.co.kr" target="_blank">구글</a>
  <a href="https://swtrack.lms.elice.io/" target="_blank">엘리스</a>
</nav>
<p>
  <span>작성자: 7조</span>
  <span>연락처: 010-1234-5678</span>
  <span>저작권</span>
</p>
</div>
<div class="second">
<div>
  <h1>FOOTER ELEMENT</h1>
  <h2>FOOTER ELEMENT 2</h2>
  <h3>FOOTER ELEMENT 3</h3>
  <p>Copyright @2022 엘리스 소프트웨어</p>
</div>
<a href="#">Index</a>
<p>Copyright @2022 Elice SWtrack - #7</p>
<address></address>
</div>
`;
