const nodemailer = require('nodemailer');

const config = require('../config');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testinfomail5@gmail.com',
      pass: 'superpassword',
    }
});
function getMailOptions(receiverMail, subject, html) {
    const mailOptions = {
        from: 'testinfomail5@gmail.com', // sender address
        to: receiverMail, // list of receivers
        subject: subject, // Subject line
        html: html // plain text body
    };
    return mailOptions;
}

exports.confirmationMail = async (userMail, token) => {
    const subject = 'React TODO | Confirm registration process';
    const href = `${config.host}:${config.port}/sing-up/confirm?t=${token}`;
    const html = `
  <h1> Thanks for your registration! </h1>
  <p> Please confirm your account by clicking on the</p>
  <a href=${href}><b style="color: #0d79bf">CONFIRMATION LINK</b></a>
  `;
    const report = {};
    transport.sendMail(getMailOptions(userMail, subject, html), function(err, info) {
        if (err) {
            report.data = err;
            report.success = false;
        } else {
            report.data = info;
            report.success = true;
        }
        return report;
    });
};
