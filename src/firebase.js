import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FCM_API_KEY}`,
  authDomain: 'gomgom-5f801.firebaseapp.com',
  projectId: 'gomgom-5f801',
  storageBucket: 'gomgom-5f801.appspot.com',
  messagingSenderId: `${process.env.REACT_APP_SENDERID}`,
  appId: `${process.env.REACT_APP_FCM_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FCM_MEASUREMENT_ID}`,
};

export const firebaseApp = initializeApp(firebaseConfig);
