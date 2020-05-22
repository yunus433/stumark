const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

const htmlToText = require('nodemailer-html-to-text').htmlToText;

dotenv.config({ path: path.join(__dirname, ".env") });

const {
  MAIL_USER_NAME,
  MAIL_PASSWORD
} = process.env;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER_NAME, 
    pass: MAIL_PASSWORD
  }
});
transporter.use('compile', htmlToText());

const templates = {
  userRegister: (data) => ({
    to: data.email,
    subject: 'Stumarkt.com: Kaydını onayla',
    html: `
      Değerli kullanıcımız,
      <br />
      <br />
      Lütfen linke tıklayarak hesabınızı onaylayın: <a href='https://www.stumarkt.com/auth/verify/post/?id=${data.userId}'>https://www.stumarkt.com/auth/verify<a />
      <br />
      <br />
      Aramıza katıldığınız için çok teşekkür ederiz! Eğer bir sorununuz olursa bize danışmaktan çekinmeyin.
      <br />
      <br />
      Stumarkt Ekibi
    `
  }),
  passwordReset: (data) => ({
    to: data.email,
    subject: 'Stumarkt.com: Password Reset',
    html: `
      Liebe/r Nutzer/in,
      <br />
      Um ihr Passwort aktualisieren zu können, bitte klicken Sie auf diesen Link: <a href='https://www.stumarkt.com/auth/reset/post/?id=${data.userId}&keyword=${data.passwordKeyword}'>https://www.stumarkt.com/auth/reset<a />
      <br />
      <br />
      If you didn't make this request, please ignore this email. For additional information, please contact with out customer service.
      <br />
      <br />
      Dein Stumarkt-Team
    `
  })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: "admin@stumarkt.com",
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};
