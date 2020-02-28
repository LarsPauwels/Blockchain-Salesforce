class Transaction {
	constructor(fromAdress, transaction) {
		this.fromAdress = fromAdress;
		this.transaction = transaction;
	}

	calculateHash() {
		return SHA256(this.fromAdress + this.data).toString();
	}

	isValid() {
		if(this.fromAdress === null || this.fromAdress === "") {
			return false;
		};

		if(this.transaction === null || this.transaction === "") {
			return false;
		};

		return true;
	}
}

module.exports = Transaction;