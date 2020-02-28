const database = require("../src/database");
const blockchainModel = require("../src/database/model");

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
	
	blockchainModel.findOne({'index': id}, (err, userDocs)=>{
		if (err) {
			res.json({
                "status": "error",
                "message": `Something went wrong!`  
            });
		}

        if (userDocs === null || userDocs.length == 0) {
            res.json({
                "status": "fail",
                "message": `Coudn't find any products with id '${id}'`  
            });
        } else {
            res.json({
                "status": "success",
                "message": userDocs
            });
        }
    });
}

let productBySender = (req, res) => {
	let sender = req.params.sender;
	let result = [];

	blockchainModel.aggregate([{$project: { transactions: 1, _id: 0}}], (err, blocks) => {
		if (err) {
			res.json({
                "status": "error",
                "message": `Something went wrong!`  
            });
		}

		blocks.forEach((transactions) => {
			Object.values(transactions)[0].forEach((transaction) => {
				let fromAdress = transaction[0].fromAdress;
				if (fromAdress != undefined) {
					if (fromAdress.toLowerCase().includes(sender.toLowerCase())) {
						result.push(transaction[0]);
					}
				}
			});
		});

		if (result.length === 0) {
			res.json({
	            "status": "fail",
	            "message": `Coudn't find any products with sender '${sender}'`
	        });
		} else {
			res.json({
	            "status": "success",
	            "amount": `Found '${result.length}' results where the senders name '${sender}' contains.`,
	            "message": result
	        });
		}
	});
}

let productByName = (req, res) => {
	let name = req.params.name;
	let result = [];

	blockchainModel.aggregate([{$project: { transactions: 1, _id: 0}}], (err, blocks) => {
		if (err) {
			res.json({
                "status": "error",
                "message": `Something went wrong!`  
            });
		}

		blocks.forEach((transactions) => {
			Object.values(transactions)[0].forEach((transaction) => {
				let productName = transaction[0].transaction;
				if (productName != undefined) {
					productName = productName.product.name;
					if (productName.toLowerCase().includes(name.toLowerCase())) {
						result.push(transaction);
					}
				}
			});
		});

		if (result.length === 0) {
			res.json({
	            "status": "fail",
	            "message": `Coudn't find any products with name '${name}'`
	        });
		} else {
			res.json({
	            "status": "success",
	            "amount": `Found '${result.length}' products that contain '${name}'.`,
	            "message": result
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