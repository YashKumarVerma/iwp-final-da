var nodemailer = require('nodemailer');

const sendEmail = (targetEmail, subject, body) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SOURCE,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_SOURCE,
    to: targetEmail,
    subject: subject,
    text: body,
    attachments: [
      {
        filename: 'invoice.pdf',
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


module.exports = {sendEmail}