import firebase from 'firebase/app';
import 'firebase/auth';
import apiKey from './config';

const config = {
  apiKey,
  authDomain: "theends.firebaseapp.com",
  databaseURL: "https://theends.firebaseio.com",
  projectId: "theends",
  storageBucket: "theends.appspot.com",
  messagingSenderId: "178375851777"
};

firebase.initializeApp(config);

export default firebase;