import { boot } from "quasar/wrappers";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDNbIJ3w7ZZz_az_PEU0GbE__2ihQfynqY",
  authDomain: "silabussm.firebaseapp.com",
  projectId: "silabussm",
  storageBucket: "silabussm.appspot.com",
  messagingSenderId: "564641944852",
  appId: "1:564641944852:web:e1f5ee7a76a52263f45e01",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const marcatiempo = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcatiempo, storage };


export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
