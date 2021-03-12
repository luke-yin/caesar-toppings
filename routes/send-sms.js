
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })



//TODO all caps for process.env vars
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// order is ready
const twilio = async () => {
  await client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+19027023630',
    body: 'Your caesars are being prepared 🙌🏼... Come pick it up in 20 mins! 🥤'
  })
    .then(message => {
      console.log('within async message.sid', message.sid)
    });
};


module.exports = twilio;


