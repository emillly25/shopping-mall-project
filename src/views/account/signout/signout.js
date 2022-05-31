import * as Api from '/api.js';

const passwordInput = document.getElementById('passwordInput');
const deleteBtn = document.getElementById('deleteBtn');

async function deleteUser(e) {
  e.preventDefault();
  if (!confirm('정말 회원 탈퇴하시겠습니까?')) return;
  const password = passwordInput.value;
  const data = { password };
  try {
    const res = await Api.delete('/api/user', data);

    alert(`${res.message}`);
    console.log('삭제된 유저 data : ', res.result);

    // 회원 정보 삭제 후 로그아웃도 같이 되게끔
    sessionStorage.removeItem('token');
    window.location.href = '/';
  } catch (err) {
    alert(err.message);
  }

  // 회원 정보 삭제
}
deleteBtn.addEventListener('click', deleteUser);
