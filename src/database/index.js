const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

let database = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blockchain-de811.firebaseio.com"
});

// module.exports.database = database;