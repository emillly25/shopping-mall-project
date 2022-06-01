import * as Api from '/api.js';

const sendEmailBtn = document.getElementById('sendEmailBtn');
const emailEl = document.getElementById('emailInput');
const phoneNumberEl = document.getElementById('phoneNumberInput');

sendEmailBtn.addEventListener('click', async () => {
  try {
    const email = emailEl.value;
    const phoneNumber = phoneNumberEl.value;
    const data = { email, phoneNumber };
    const res = await Api.post('/api/resetPassword', data);
    alert(res.message);
    window.location.href = '/account';
  } catch (err) {
    alert(err);
  }
});
