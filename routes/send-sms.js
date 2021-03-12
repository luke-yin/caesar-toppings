// require('dotenv').config();
// require('dotenv').load();
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


// const express = require('express');
// const router = express.Router();

//TODO all caps for process.env vars
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const twilio = async () => {
  await client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+19027023630',
    body: 'A new order has been placed... Log in and confirm order 🥤'
  })
    .then(message => {
      console.log('within async message.sid', message.sid)
    });
};

const twilioTwo = async () => {
  await client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+19027023630',
    body: "Your Caesar's order is complete... enjoy! 🥤"
  })
    .then(message => {
      console.log('within async message.sid', message.sid)
    });
};
module.exports = twilio, twilioTwo;
