const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require("./fir-bug-ee9d1-firebase-adminsdk-szbhs-e19921a100");

const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-bug-ee9d1.firebaseio.com"
});


// create a GET route
app.get('/init', async (req, res) => {
  const token = await admin.auth().createCustomToken('bla');
  res.send({token});
});