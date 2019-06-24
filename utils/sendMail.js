const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: { 
    user: 'stumarktcom@gmail.com', 
    pass: 'stumarkt123LOY321'
  },
  secure: true
});
transporter.use('compile', htmlToText());

const templates = {
  userRegister: (data) => ({
    to: data.email,
    subject: 'Stumarkt.com: Bestätigung deiner Registrierung',
    html: `
      Liebe/r Nutzerin/Nutzer,
      <br />
      <br />
      Mit diesem Link bestätigst du deine Registrierung: <a href='www.stumarkt.com/auth/verify/post/?id=${data.userId}'> stumarkt.com <a />
      <br />
      Mit deiner E-Mail-Adresse und deinem Passwort kannst du dich jederzeit bei Stumarkt einloggen, um dein Anzeigen zu bearbeiten oder zu löschen. 
      <br />
      <br />
      Solltest du die Registrierung nicht beauftragt haben, so ignoriere diese E-Mail bitte. Die Registrierung wird dann nicht bestätigt und die E-Mail-Adresse später automatisch bei uns gelöscht.
      <br />
      <br />
      Deine Stumarkt-Team
    `
  })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};