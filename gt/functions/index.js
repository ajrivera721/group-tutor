const functions = require('firebase-functions');
const os = require('os');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
admin.initializeApp();

exports.writeToBucket = functions.firestore
    .document('requests/{requestId}')
    .onCreate((snap, context) => {
		console.log( "Inside #writeToBucket" );
		const storage = admin.storage()

		const info = snap.data();
		
		let fileName = snap.get('std_name').toLowerCase().concat('.json');
		let destination = '/requests/'.concat(fileName);

		console.log( destination );
		
		const tempFilePath = path.join(os.tmpdir(), fileName);
		console.log( `Writing out to ${tempFilePath}` );
		fs.writeFileSync(tempFilePath, JSON.stringify(info) );

		const db = admin.firestore();
		let deleteDoc = db.collection('requests').doc(context.params.requestId).delete();
		
		return storage
			.bucket()
			.upload( tempFilePath, { destination } )
			.then( () => fs.unlinkSync(tempFilePath) )
			.catch(err => console.error('ERROR inside upload: ', err) );
    });

exports.pullCSV = functions.storage
	.object().onArchive(async (object) => {

		const fileBucket = object.bucket;
		const filePath = object.name;

		const fileName = path.basename(filePath);
		
		const bucket = admin.storage().bucket(fileBucket);
		const tempFilePath = path.join(os.tmpdir(), fileName);

		await bucket.file(filePath).download({destination: tempFilePath});

		fs.createReadStream(tempFilePath)
			.pipe(csv())
			.on('data', (row) => {
				console.log(row);
			})
	});
