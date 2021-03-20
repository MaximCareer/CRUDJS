var nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
var fs = require('fs');
const Registration = require('../models/Registration');


async function AuthenticateRequest(token) {
  const registration = await Registration.findById(token);
  return registration;
}

router.post('/', async (req, res) => {
  var authenticated = await AuthenticateRequest(req.headers.token)
  if (authenticated != null) {

    var transporter = nodemailer.createTransport({
      host: "webmail.maximcareer.com",
      port: 25,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "no-reply@maximcareer.com",
        pass: "Prince@9428472974"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let filePath;
    if (req.body.type == "verify") {
      filePath = './email/verify.html';
    }
    else if (req.body.type == "purchase") {
      filePath = './email/purchase.html';
    }
    else if (req.body.type == "forget") {
      filePath = './email/forget.html';
    }
    else if (req.body.type == "ebook") {
      filePath = './email/ebook.html';
    }
    else {
      filePath = null;
    }

    if (filePath != null) {
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      var htmlToSend = source.replace("{v_link}", req.body.vLink)
      htmlToSend = htmlToSend.replace("{name}", authenticated.fname)
      htmlToSend = htmlToSend.replace("{oid}", req.body.oid)
      htmlToSend = htmlToSend.replace("{email_id}", authenticated.email)
      htmlToSend = htmlToSend.replace("{password_id}", authenticated.pass)
      var mailOptions = {
        from: 'no-reply@maximcareer.com',
        to: req.body.email,
        subject: req.body.subject,
        html: htmlToSend
      };


      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json("Email Failed");
        } else {
          res.json("Email Sent");
        }
      });
    }
    else{
      res.json("Invalid Email Type");
    }
  }
  else {
    res.json("No Access");
  }
});
module.exports = router