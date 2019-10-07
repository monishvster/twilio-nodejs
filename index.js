const accountSid = 'AC6c17c1526ababebd9fb3b60fbd04389a';
const authToken = '2f6d85ba9426c4be3f52c1f6aec6e880';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is test message from Twilio API. You are my guinea pig!!',
     from: '+12055462582',
     to: '+16605280927'
   })
  .then(message => console.log(message.sid));