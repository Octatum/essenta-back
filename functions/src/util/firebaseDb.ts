import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };

const firebaseDb = admin.firestore();
firebaseDb.settings(settings);

export default firebaseDb;