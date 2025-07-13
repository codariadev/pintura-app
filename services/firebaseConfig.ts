// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAsioXQxpILQXjN7w8D5JozHOpsvOW0AfM',
  authDomain: 'pintura-app-e3dec.firebaseapp.com',
  projectId: 'pintura-app-e3dec',
  storageBucket: 'pintura-app-e3dec.firebasestorage.app',
  messagingSenderId: '359941078562',
  appId: '1:359941078562:web:b0b4d222892c8312f6547b',
  measurementId: 'G-7NWE67P0SX',
};

const app = initializeApp(firebaseConfig);

// Inicializa a autenticação com persistência no AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
