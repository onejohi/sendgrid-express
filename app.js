const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const port = process.env.PORT;

sgMail.setApiKey(process.env.SEND_GRID_API);

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => {
  res.json({ ok: true, data: "Works!!" });
});

app.post('/send_mail', (req, res) => {
  const { to, from, subject, text, html } = req.body;
  // if 4 of the values exist, send email.
  if (to && from && subject && text ) {
    const mailBody = {
      to, from, subject, text, html
    };
    sgMail.send(mailBody).then((result) => {
      res.json({ ok: true, data: result });
    }).catch((e) => {
      res.json({ ok: false, error: e });
    });
  }
});

app.listen(port || 3000, () => {
  console.log(`Server running on port: ${port}`);
});