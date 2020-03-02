const admin = require("firebase-admin");
const database = require("../src/database/index");

const db = admin.database();
const chainRef = db.ref('blockchain/chain');

const Blockchain = require('../src/models/blockchain');
const Transaction = require('../src/models/transaction');
const blockchain = new Blockchain();

let getProducts = (req, res) => {
    res.json({
        "status": "success",
        "data": blockchain.chain
    });
}

let createProduct = (req, res) => {
	const transaction = new Transaction(req.body.sender, req.body.data);
	blockchain.createPendingTransaction(transaction);

	res.json({
        "status": "success",
        "message": `Transaction successfully added.`
    });
}

let mineProduct = (req, res) => {
	if (blockchain.pendingTransaction.length !== 0) {
		blockchain.minePendingTransaction();

		res.json(
	        {
	        	status: "success",
	            message: 'Mining new Block successfully!'
	        }
	    );
	} else {
        res.json(
            {
                status: "fail",
                message: 'Currently no blocks to mine!'
            }
        );
    }
}

let productByIndex = (req, res) => {
	let id = req.params.id;
	let result;

	chainRef.once("value", snapshot => {
	  	snapshot.forEach(doc => {
		  	if (doc.val().block.index == id) {
		  		result = doc.val().block;
		  	}
	  	});

	  	if (result == undefined) {
	  		res.json({
                "status": "fail",
                "message": `Coudn't find any products with id '${id}'`  
            });
	  	} else {
	  		res.json({
			    "status": "success",
			    "data": result
			});
	  	}
	});
}

let productBySender = (req, res) => {
	let sender = req.params.sender;
	let result = [];

	chainRef.once("value", snapshot => {
	  	snapshot.forEach(doc => {
	  		let transactions = doc.val().block.transactions;

	  		if (Array.isArray(transactions)) {
	  			transactions.forEach(transaction => {
		  			let fromAdress = transaction.fromAdress;
	  				if (fromAdress.toLowerCase().includes(sender.toLowerCase())) {
				  		result.push(transaction);
				  	}
		  		});
	  		}
	  	});

	  	if (result.length === 0) {
	  		res.json({
	            "status": "fail",
	            "message": `Coudn't find any products with sender '${sender}'`
	        });
	  	} else {
	  		res.json({
			    "status": "success",
			    "amount": `Found '${result.length}' results that '${sender}' contains.`,
			    "data": result
			});
	  	}
	});
}

let productByName = (req, res) => {
	let name = req.params.name;
	let result = [];

	chainRef.once("value", snapshot => {
	  	snapshot.forEach(doc => {
	  		let transactions = doc.val().block.transactions;

	  		if (Array.isArray(transactions)) {
	  			transactions.forEach(transaction => {
		  			let productName = transaction.transaction.product.name;
	  				if (productName.toLowerCase().includes(name.toLowerCase())) {
				  		result.push(transaction);
				  	}
		  		});
	  		}
	  	});

	  	if (result.length === 0) {
	  		res.json({
	            "status": "fail",
	            "message": `Coudn't find any products with the name '${name}'`
	        });
	  	} else {
	  		res.json({
			    "status": "success",
			    "amount": `Found '${result.length}' results that '${name}' contains.`,
			    "data": result
			});
	  	}
	});
}

//Products GET
module.exports.getProducts = getProducts;
module.exports.mineProduct = mineProduct;
module.exports.productBySender = productBySender;
module.exports.productByName = productByName;
module.exports.productByIndex = productByIndex;

//Products POST
module.exports.createProduct = createProduct;
// module.exports.getProductsByCompany = getProductsByCompany;