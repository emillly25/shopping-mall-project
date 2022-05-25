const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const submitBtn = document.querySelector('#submitBtn');
const emailIcon = document.querySelector('#emailIcon');
const emailCheck = document.querySelector('#emailCheck');
const passwordIcon = document.querySelector('#passwordIcon');


//로그인 input value 검증
submitBtn.addEventListener('click',function(e){
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    let reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if(reg.test(email) === false){
        console.log('이메일이 유효하지 않습니다.')
    }else if(password.length <5){
        console.log('비밀번호가 틀렸습니다.')
    }else{
        console.log('로그인 성공')
    }
})
