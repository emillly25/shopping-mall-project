// header.js
const headerEl = document.querySelector('header');
headerEl.innerHTML = `
<nav class="navbar" role="navigation" aria-label="main navigation">
<div class="info_header">
  <div class="info_logo">
    <a href="/"><h1>칠전팔기</h1></a>
  </div>
</div>

<div class="menu_header">
  <ul class="category">
    <li><a href="/bestseller" id="li_hover">베스트셀러</a></li>
    <li><a href="/novel" id="li_hover">소설</a></li>
    <li><a href="/poet" id="li_hover">시/에세이</a></li>
    <li><a href="/self" id="li_hover">자기계발</a></li>
    <li><a href="/economy" id="li_hover">경영/경제</a></li>
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
      <li class="none"><a href="/" id="logout">로그아웃</a></li>
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
    // menu.style.backgroundColor = 'pink';
    menu.style.zIndex = 100;
    menu.style.width = '1344px';
    menu.style.top = '0';
  } else {
    menu.style.position = 'relative';
    menu.style.width = '100%';
  }
});

//dropdown menu
// const dropmenu = document.querySelector('#dropmenu');
// const dropdown = document.querySelector('.dropdown');

// dropmenu.addEventListener('mouseenter', function () {
//   dropdown.style.display = 'block';
// });

// dropmenu.addEventListener('mouseleave', function () {
//   dropdown.style.display = 'none';
// });

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
    // window.location.href = '/';
  }
});

// footer.js

const footerEl = document.querySelector('footer');
footerEl.innerHTML = `
<div class="footer-list notice">
  <div class="footer-subtitle">Notice</div>
  <div class="footer-rows">
    <span>8주차 프로젝트 교육 만족도조사 실시</span>
  </div>
  <div class="footer-rows">
    <span>협업 노하우&에티켓 페이지 안내</span>
  </div>
  <div class="footer-rows">
    <span>프론트엔드 첫 오피스아워 만족도 조사</span>
  </div>
  <div class="footer-rows">
    <span>백엔드 첫 오피스아워 만족도 조사</span>
  </div>
  <div class="footer-rows">
    <span>7주차 교육 만족도 조사 안내 리마인드 </span>
  </div>
</div>
<div class="footer-list madeBy">
  <div class="footer-subtitle">Made By</div>
  <div class="footer-rows">
    <span>김지환</span>
    <span>
      <a href="https://github.com/shinbian11" target="_blank">
        Github
      </a>
    </span>
    <span>
      <a href="https://shinbian11.tistory.com/" target="_blank">
        Blog
      </a>
    </span>
    <span class="icon">
      <a
        href="http://shinbian11.kdt-gitlab.elice.io/produce-myself/"
        target="_blank"
      >
        Info
      </a>
    </span>
  </div>
  <div class="footer-rows">
    <span>김범석</span>
  </div>
  <div class="footer-rows">
    <span>김세희</span>
    <span>
      <a href="https://github.com/emillly25" target="_blank">
        Github
      </a>
    </span>
    
    <span class="icon">
      <a
        href="http://sehee.kdt-gitlab.elice.io/produce-myself"
        target="_blank"
      >
        Info
      </a>
    </span>
  </div>
  <div class="footer-rows">
    <span>여은지</span>
    <span>
      <a href="https://github.com/eunnj" target="_blank">
        Github
      </a>
    </span>
    
    <span class="icon">
      <a
        href="http://eunnj.kdt-gitlab.elice.io/produce-myself/"
        target="_blank"
      >
        Info
      </a>
    </span>
  </div>
  <div class="footer-rows">
    <span>정덕준 </span>
    <span class="icon">
      <a
        href="http://jungdukjoon.kdt-gitlab.elice.io/dukjoon-jung-introduction/"
        target="_blank"
      >
        Info
      </a>
    </span>
  </div>
</div>
<div class="footer-list aboutElice">
  <div class="footer-subtitle">About Elice</div>
  <div class="footer-rows">
    <span>
      주소 : 대전광역시 유성구 문지로 193 KAIST 캠퍼스 진리관 T 201호
    </span>
  </div>
  <div class="footer-rows">
    <span>대표자 김재원</span>
  </div>
  <div class="footer-rows">
    <span>이메일 contact@elice.io</span>
  </div>
  <div class="footer-rows">
    <span>
      <a
        href="https://www.facebook.com/elice.coding/"
        target="_blank"
      >
        Move to Elice Facebook
      </a>
    </span>
  </div>
  <div class="footer-rows">
    <span>
      <a
        href="https://www.youtube.com/channel/UCTok20p3EzAjTJWV8SJM9Gw"
        target="_blank"
        >Move to Elice Youtube
      </a>
    </span>
  </div>
</div>
`;
