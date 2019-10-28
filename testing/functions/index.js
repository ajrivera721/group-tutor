/*
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


// Take the text parameter passed to this HTTP endpoint and insert it into the
n// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
// Grab the text parameter.
const original = req.query.text;
// Push the new message into the Realtime Database using the Firebase Admin SDK.
const snapshot = await admin.database().ref('/messages').push({original: original});
// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
res.redirect(303, snapshot.ref.toString());
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
// Grab the current value of what was written to the Realtime Database.
const original = snapshot.val();
console.log('Uppercasing', context.params.pushId, original);
const uppercase = original.toUpperCase();
// You must return a Promise when performing asynchronous tasks inside a Functions such as
// writing to the Firebase Realtime Database.
// Setting an "uppercase" sibling in the Realtime Database returns a Promise.
return snapshot.ref.parent.child('uppercase').set(uppercase);
});
*/
/*
  const functions = require('firebase-functions');
  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  const admin = require('firebase-admin');
  admin.initializeApp();

  exports.testItOut = functions.firestore
  .document('users/{docId}')
  .onCreate((snap, context) => {

  const newValue = snap.data();
  console.log( "Inside #testItOut" );
  const storage = admin.storage()
  let fileName = 't.txt';
  let destination = '/signatures/t.txt';
  const tempFilePath = path.join(os.tmpdir(), fileName);
  console.log( `Writing out to ${tempFilePath}` );
  fs.writeFileSync(tempFilePath, newValue.a );

  return storage
  .bucket()
  .upload( tempFilePath, { destination } )
  .then( () => fs.unlinkSync(tempFilePath) )
  .catch(err => console.error('ERROR inside upload: ', err) );
  });

*/
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

		const requestTag = snap.get('topic'); 

		const db = admin.firestore();

		let queue = db.collection('tickets');

		var stillSingle = true;
		let allCities = queue.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					if(stillSingle){
						if(doc.get('topic') === requestTag){
							stillSingle = false;
							var numStudents = doc.get('numKids');
							doc.update({
								numKids: numStudents + 1
							});
						}
					}
				});
			})
			.catch(err => {
				console.log('Error getting documents', err);
			});

		

		
		
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

		fs.createReadStream('data.csv')
			.pipe(csv())
			.on('data', (row) => {
				console.log(row);
			})
	});
