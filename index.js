const express = require('express');
const Twilio = require('twilio');
require('dotenv').config();

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//-------------- END OF IMPORTS ------------------

const port = 8080;
app.use(cors());
app.use(bodyParser.json());

// ------------------- END OF MIDDLEWARE

app.post('/sendData', (req, res) => {
  console.log('server');
  console.log(req.body.topWords);
});
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = new Twilio(accountSid, authToken);

app.post('/sendMessage', (req, res) => {
  console.log('server to send message');
  console.log(req.body);
  client.messages
    .create({
      body: req.body.msg,
      from: '+18884922935',
      to: req.body.number,
    })
    .then((message) => {
      console.log('Message sent:', message.sid);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
});

// ----------------- END OF ROUTES ----------------

app.listen(port, () => {
  console.log('Server Has Started on ' + port);
});
