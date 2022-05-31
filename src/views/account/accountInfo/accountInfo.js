import * as Api from '/api.js';

// get : 기본적으로 자신의 회원정보를 가져와서 보여주기

const username = document.getElementById('username');
const currentPassword = document.getElementById('currentPassword');
const userPassword = document.getElementById('userPassword');
const userPasswordCheck = document.getElementById('userPasswordCheck');
const postcode = document.getElementById('postcode');
const mainAddress = document.getElementById('mainAddress');
const subAddress = document.getElementById('subAddress');
const userPhoneNo = document.getElementById('userPhoneNo');

const res = await Api.get('/api/user');
console.log(res);

// 이름은 필수 속성
username.placeholder = res.result.fullName;

// 우편번호, 메인 주소, 서브주소, 전화번호는 필수 속성이 아닙니다.

if (res.result.address) {
  if (res.result.address.postalCode)
    postcode.placeholder = res.result.address.postalCode;
  if (res.result.address.address1)
    mainAddress.placeholder = res.result.address.address1;
  if (res.result.address.address2)
    subAddress.placeholder = res.result.address.address2;
  if (res.result.phoneNumber) userPhoneNo.placeholder = res.result.phoneNumber;
}

// patch : 회원정보 수정

// fullName, password, address, phoneNumber,role
async function updateUserData(e) {
  // 해결과제2) 비번 바꾸고 싶지 않을때도 체크!
  e.preventDefault();

  if (userPassword.value !== userPasswordCheck.value) {
    alert(
      '변경하고자 하는 비밀번호와 변경하고 싶은 비밀번호 확인이 일치하지 않음',
    );
    return;
  }

  const data = {
    fullName: username.value,
    currentPassword: currentPassword.value,
    password: userPassword.value,
    // 해결과제1) address 에는 입력하지 않는 text가 있더라도, 초기화되지 않게 하기!
    address: {
      postalCode: postcode.value,
      address1: mainAddress.value,
      address2: subAddress.value,
    },
    phoneNumber: userPhoneNo.value,
  };
  console.log(data);
  try {
    const res = await Api.patch('/api/user', data);
    console.log(res);
    alert('성공적인 업데이트!');
    window.location.href = '/';
  } catch (err) {
    alert(err.message);
  }
}

let deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', updateUserData);
