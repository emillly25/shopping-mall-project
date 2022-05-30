import * as Api from '/api.js';

const username = document.getElementById('username');
const userPassword = document.getElementById('userPassword');
const postcode = document.getElementById('postcode');
const mainAddress = document.getElementById('mainAddress');
const subAddress = document.getElementById('subAddress');
const userPhoneNo = document.getElementById('userPhoneNo');

const res = await Api.get('/api/user');
// console.log(res);
username.placeholder = res.result.fullName;

// 우편번호, 메인 주소, 서브주소, 전화번호는 필수 속성이 아닙니다.
// 속성들을 추가하였을 때는 post 되어야 합니다.
// post 기능 추가하기!

if (res.result.address.postalCode)
  postcode.placeholder = res.result.address.postalCode;
if (res.result.address.address1)
  mainAddress.placeholder = res.result.address.address1;
if (res.result.address.address2)
  subAddress.placeholder = res.result.address.address2;
if (res.result.phoneNumber) userPhoneNo.placeholder = res.result.phoneNumber;
