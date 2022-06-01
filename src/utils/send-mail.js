import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_ID, // 발송자 이메일
    pass: process.env.MAIL_PASSWORD, // 발송자 비밀번호
  },
});

function sendMail(to, subject, text) {
  new Promise((resolve, reject) => {
    const message = {
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
}

export { sendMail };
