const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'admin@stumarkt.com', 
    pass: '14121998samsun'
  }
});
transporter.use('compile', htmlToText());

const templates = {
  userRegister: (data) => ({
    to: data.email,
    subject: 'Stumarkt.com: Bestätigung deiner Registrierung',
    html: `
      Liebe/r Nutzer/in,
      <br />
      <br />
      Mit diesem Link bestätigst du deine Registrierung: <a href='https://www.stumarkt.com/auth/verify/post/?id=${data.userId}'>https://www.stumarkt.com/auth/verify<a />
      <br />
      <br />
      Mit deiner E-Mail-Adresse und deinem Passwort kannst du dich jederzeit bei Stumarkt einloggen, um dein Anzeigen zu bearbeiten oder zu löschen. 
      <br />
      <br />
      Solltest du die Registrierung nicht beauftragt haben, so ignoriere diese E-Mail bitte. Die Registrierung wird dann nicht bestätigt und die E-Mail-Adresse später automatisch bei uns gelöscht.
      <br />
      <br />
      Dein Stumarkt-Team
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
