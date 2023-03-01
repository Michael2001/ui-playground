// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-VZkzh-mxBMABmWXXDDbVaTforMHOSqw',
  authDomain: 'playground-d4ec1.firebaseapp.com',
  projectId: 'playground-d4ec1',
  storageBucket: 'playground-d4ec1.appspot.com',
  messagingSenderId: '771239864087',
  appId: '1:771239864087:web:f9269db9d853911d103952',
  measurementId: 'G-GFHY28YEGP',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
