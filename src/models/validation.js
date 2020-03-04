const admin = require("firebase-admin");
const deepEqual = require('deep-equal');
const { diffString, diff } = require('json-diff');

const db = admin.database();
const chainUsersRef = db.ref('blockchain/chain-users');
const chainV1Ref = db.ref('blockchain/chain-v1');
const chainV2Ref = db.ref('blockchain/chain-v2');

class Validation {
	dataChanges() {
		chainUsersRef.on("child_changed", (snapshot) => {
			let id = snapshot.key;
			let data = snapshot.val();
		  	this.compareData(id, data);
		});

		chainV1Ref.on("child_changed", (snapshot) => {
			let id = snapshot.key;
			let data = snapshot.val();
			this.compareData(id, data);
		});

		chainV2Ref.on("child_changed", (snapshot) => {
			let id = snapshot.key;
			let data = snapshot.val();
		  	this.compareData(id, data);
		});

		/*Doesn't add to quickly*/
		// chainUsersRef.on("child_added", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });

		// chainV1Ref.on("child_added", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });

		// chainV2Ref.on("child_added", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });

		// Verschillende types maken
		// chainUsersRef.on("child_removed", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });

		// chainV1Ref.on("child_removed", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });

		// chainV2Ref.on("child_removed", (snapshot) => {
		// 	let id = snapshot.key;
		// 	let data = snapshot.val();
		//   	this.compareData(id, data);
		// });
	}

	compareData(id, data) {
		let check = [false, false, false];
		let refs = [chainUsersRef, chainV1Ref, chainV2Ref];
		let dataStructurs = [];

		refs[0].child(id).once('value').then((snapshot) => {
			if (!deepEqual(snapshot.val(), data)) {
				check[0] = true;
			}
			dataStructurs.push(snapshot.val());
		}).then(() => {
			refs[1].child(id).once('value').then((snapshot) => {
				if (!deepEqual(snapshot.val(), data)) {
					check[1] = true;
				}
				dataStructurs.push(snapshot.val());
			}).then(() => {
				refs[2].child(id).once('value').then((snapshot) => {
					if (!deepEqual(snapshot.val(), data)) {
						check[2] = true;
					}
					dataStructurs.push(snapshot.val());
				}).then(() => {
					if (check.includes(true)) {
						let indexFalse = check.indexOf(false);
						let indexTrue = check.indexOf(true);
						let currentdata = dataStructurs[indexTrue];
						console.log(dataStructurs);

						refs[indexFalse].child(id).set({
							index: currentdata.index,
							timestamp: currentdata.timestamp,
							transactions: currentdata.transactions,
							previousHash: currentdata.previousHash,
							hash: currentdata.hash,
							nonce: currentdata.nonce
						});
					}
					check = [false, false, false];

				});
			});
		});
	}
}

module.exports = Validation;