// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDWBbmZTTH7W-ozU1ZUOUDfs1ziViQG27E',
  authDomain: 'peepeepad-fa20c.firebaseapp.com',
  projectId: 'peepeepad-fa20c',
  storageBucket: 'peepeepad-fa20c.firebasestorage.app',
  messagingSenderId: '511540180214',
  appId: '1:511540180214:web:2432343c647c1eddb3e8d7',
  measurementId: 'G-72M8HVZB5J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
