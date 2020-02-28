const mongoClient = require('mongodb').MongoClient;  
const mongoose = require('mongoose');
const BlockchainModel = require("./model");

mongoose.connect("mongodb://localhost:27017/blockchain", {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
	if (err) {
		return console.log("Cannot connect to DB");
	}

	connectionCallback();
	console.log("Database is connected");
	// db.createCollection("chain", function(err, res) {  
	// 	if (err) throw err;  
	// 	console.log("Collection is created!");  
	// 	connectionCallback();
	// 	db.close();  
	// });
	// db.collection("chain");
});

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
	connectionCallback = callback;
}