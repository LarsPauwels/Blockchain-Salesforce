const Block = require('./block');
const mongoose = require("mongoose");

const blockchainModel = mongoose.model("Blockchain");
const blockchainDB = require("../database/model");

class Blockchain {
	constructor() {
		this.getData((chain) => {
			this.chain = chain;
		});

		this.pendingTransaction = [];
		this.difficulty = 2;
	}

	getData(callback) {
		blockchainDB.find({}).then((chain) => {
			if (chain.length === 0) {
				return callback(this.createGenesisBlock());
			} else {
				return callback(chain);
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
		return blockchainDB.countDocuments().then((count) => {
		    return callback(count);
		});
	}

	minePendingTransaction() {
		this.getIndex((count) => {
			let block = new Block(count, this.pendingTransaction, this.getLatestBlock().hash);
			block.mineBlock(this.difficulty);
			this.addToDatabase(block);

			this.chain.push(block);
			this.pendingTransaction = []; 
		});
	}

	addToDatabase(block) {
		let newBlock = new blockchainModel(block);
		newBlock.save((err) => {
			if (err) {
				return console.log("Cannot save block to DB: ", err.message);
			}
			console.log("Block saved on to the DB");
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