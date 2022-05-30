import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';

const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const submitBtn = document.querySelector('#submitBtn');
const emailIcon = document.querySelector('#emailIcon');
const emailCheck = document.querySelector('#emailCheck');
const passwordIcon = document.querySelector('#passwordIcon');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitBtn.addEventListener('click', handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.',
    );
  }

  // 로그인 api 요청
  try {
    const data = { email, password };

    const res = await Api.post('/api/login', data);
    const token = res.result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨
    sessionStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공
    if (res.result.role === 'admin') window.location.href = '/admin';
    else window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
