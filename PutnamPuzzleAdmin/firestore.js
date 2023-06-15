import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBr_r9Ag-Poikx6A2tTRi8CB1KTjElPPxU',
  authDomain: 'quietcorneradmin.firebaseapp.com',
  databaseURL: 'https://quietcorneradmin-default-rtdb.firebaseio.com',
  projectId: 'quietcorneradmin',
  storageBucket: 'quietcorneradmin.appspot.com',
  messagingSenderId: '979579003504',
  appId: '1:979579003504:web:69f5853e966b1d387bcab5',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
