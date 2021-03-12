// require('dotenv').config();
// require('dotenv').load();
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const express = require('express');
const router = express.Router();

//TODO all caps for process.env vars
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const twilio = async () => {

 await client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+19027023630',
    body: 'You Placed your Order Successfully!'
  })
  .then(message => {
    console.log('within async message.sid', message.sid)
    // res.redirect('/orders/customer/${order.id}');
  });

}

module.exports = twilio


// module.exports = () => {
// //get?
// router.post('/confirmation', (req, res) => {
// const order = req.session.order;

// console.log(order, 'twilio!!!')

//   client.messages.create({
//     to: process.env.MY_PHONE_NUMBER,
//     from: '+19027023630',
//     body: 'You Placed your Order Successfully!'
//   })
//   .then(message => {
//     console.log(message.sid)
//     res.redirect('/orders/customer/${order.id}');
//   });
//   return
// });


// router.get('/complete', (req, res) => {

//   client.messages.create({
//     to: process.env.MY_PHONE_NUMBER,
//     from: '+19027023630',
//     body: 'Your Order is Ready!'
//   })
//   .then(message => console.log(message.sid))

// });




// return router;
// };
