import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDt_B4xdUHmXE3c1KzUIaGXnu6DF1DPv6o',
  authDomain: 'gomgom-5f801.firebaseapp.com',
  projectId: 'gomgom-5f801',
  storageBucket: 'gomgom-5f801.appspot.com',
  messagingSenderId: '648358836971',
  appId: '1:648358836971:web:8324e3bcd408694e605cae',
  measurementId: 'G-L26D3ED5XE',
};

export const firebaseApp = initializeApp(firebaseConfig);
