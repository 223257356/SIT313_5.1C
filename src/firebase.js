// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAJo1-dgtdn-ZEiPXvj62BNK604j8Am-TU",
    authDomain: "deakin-web-app-566d6.firebaseapp.com",
    projectId: "deakin-web-app-566d6",
    storageBucket: "deakin-web-app-566d6.appspot.com",
    messagingSenderId: "825272061851",
    appId: "1:825272061851:web:2433d4d902505bf691db3e"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firestore, storage, collection };
