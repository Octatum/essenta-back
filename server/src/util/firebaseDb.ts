import * as admin from "firebase-admin";
import service from "./essenta-back.key.json";
console.log(service);

admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://essenta-back.firebaseio.com",
});

const settings = { timestampsInSnapshots: true };

const firebaseDb = admin.firestore();
firebaseDb.settings(settings);

export default firebaseDb;
