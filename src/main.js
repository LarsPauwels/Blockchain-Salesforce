const Blockchain = require('./models/blockchain');
const Transaction = require('./models/transaction');
// console.log(Blockchain);
const blockchain = new Blockchain();

const data1 = new Transaction('public key goes here', 10);
blockchain.createPendingTransaction(data1);

console.log("_________________________________Blockchain Validation_______________________________");
console.log("Valid: " + blockchain.isChainValid());
console.log("_________________________________Blockchain__________________________________________");
console.log(JSON.stringify(blockchain.chain, null, 4));