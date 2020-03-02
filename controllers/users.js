const admin = require("firebase-admin");
const database = require("../src/database/index");
const SHA1 = require('crypto-js/sha1');

const db = admin.database();
const userRef = db.ref('users');

let registerUser = (req, res) => {
	let email = req.body.email;
   	let username = req.body.username;
   	let password = SHA1(req.body.password).toString();
   	let rol = req.body.rol;

   	userRef.push({
   		email: email,
   		username: username,
   		password: password,
   		rol: rol
   	});

   	res.json({
	    "status": "success",
	    "message": `${username} created successfully!`
	});
}

let loginUser = (req, res) => {
   	let username = req.body.username;
   	let password = SHA1(req.body.password).toString();
   	let result;

   	userRef.once("value", snapshot => {
	  	snapshot.forEach(doc => {
		  	if (doc.val().username == username &&
		  		doc.val().password == password) {
		  		result = doc.val();
		  		delete result['password'];
		  	}
	  	});



	  	if (result == undefined) {
	  		res.json({
                "status": "fail",
                "message": `Incorrect username or password.`,
                "login": false 
            });
	  	} else {
	  		res.json({
			    "status": "success",
			    "message": `Welcome back ${username}.`,
                "data": result,
                "login": true
			});
	  	}
	});
}

//Users GET

//Users POST
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;