import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//chamar o sead uma unica vez!!!!!

//import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyD7zsbb6FuD-HIB3WXJv35_C5NqCSuC0q4",
  authDomain: "instaclone-57829.firebaseapp.com",
  projectId: "instaclone-57829",
  storageBucket: "instaclone-57829.appspot.com",
  messagingSenderId: "717549472334",
  appId: "1:717549472334:web:0b2bb2d2c1408a88fd511f",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

//chamando seed uma unica vez!!!!!!!!!!!!!!!!
//seedDatabase(firebase);

export { firebase, FieldValue };
