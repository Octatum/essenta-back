import * as admin from "firebase-admin";
import serviceAccount from "../../essenta-back.key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://essenta-back.firebaseio.com",
});

const firebaseDb = admin.firestore();

export default firebaseDb;
