const Block = require('./block');
const Validation = require('./validation');
const admin = require("firebase-admin");
const database = require("../database/index");
const validation = new Validation();

const db = admin.database();
const chainUsersRef = db.ref('blockchain/chain-users');
const chainV1Ref = db.ref('blockchain/chain-v1');
const chainV2Ref = db.ref('blockchain/chain-v2');

class Blockchain {
	constructor() {
		validation.dataChanges();

		this.getData((chain) => {
			this.chain = [chain];
		});

		this.pendingTransaction = [];
		this.difficulty = 2;
	}

	getData(callback) {
		return chainUsersRef.once("value", snapshot => {
		  	if (snapshot.numChildren() === 0) {
		        return callback(this.createGenesisBlock());
		    } else {
		    	let result = [];
		    	chainUsersRef.once("value", snapshot => {
		    		result.push(snapshot.val());
		    	});
		    	return callback(result);
		    }
		});
	}

	createGenesisBlock() {
		let block = new Block(0, "Genesis block", "0");
		this.addToDatabase(block);
		return block;
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	getIndex(callback) {
		return chainUsersRef.once("value", snapshot => {
			return callback(snapshot.numChildren());
		});
	}

	minePendingTransaction() {
		this.getIndex((size) => {
			let block = new Block(size, this.pendingTransaction, this.getLatestBlock().hash);
			block.mineBlock(this.difficulty);
			this.addToDatabase(block);

			this.chain.push(block);
			this.pendingTransaction = []; 
		});
	}

	addToDatabase(block) {
		chainUsersRef.push({
			index: block.index,
			timestamp: block.timestamp,
			transactions: block.transactions,
			previousHash: block.previousHash,
			hash: block.hash,
			nonce: block.nonce
		}).then((snap) => {
			this.addDataToVersions(block, snap.key);
		});
	}

	addDataToVersions(block, id) {
		chainV1Ref.child(id).set({
			index: block.index,
			timestamp: block.timestamp,
			transactions: block.transactions,
			previousHash: block.previousHash,
			hash: block.hash,
			nonce: block.nonce
		});

		chainV2Ref.child(id).set({
			index: block.index,
			timestamp: block.timestamp,
			transactions: block.transactions,
			previousHash: block.previousHash,
			hash: block.hash,
			nonce: block.nonce
		});
	}

	createPendingTransaction(transaction) {
		if (!transaction.fromAdress) {
			throw new Error('Data must include from adress.');
		}

		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid data to chain!');
		}

		this.pendingTransaction.push(transaction);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransaction()) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}

			return true;
		}
	}
}

module.exports = Blockchain;