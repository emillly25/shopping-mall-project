import * as Api from '/api.js';

const sendEmailBtn = document.getElementById('sendEmailBtn');
const emailEl = document.getElementById('emailInput');
const phoneNumberEl = document.getElementById('phoneNumberInput');

sendEmailBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const email = emailEl.value;
    const phoneNumber = phoneNumberEl.value;
    const data = { email, phoneNumber };
    console.log('data : ', data);
    const res = await Api.post('/api/resetPassword', data);
    // console.log(data);
    alert(res.message);

    window.location.href = '/login';
  } catch (err) {
    alert(err.message);
    // alert(err);
  }
});
