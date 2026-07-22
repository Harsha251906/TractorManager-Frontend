import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYyfMoTtlw8DQ4G3KNUYz5PisIXS36Ryg",
  authDomain: "tractormanager-a71b8.firebaseapp.com",
  projectId: "tractormanager-a71b8",
  storageBucket: "tractormanager-a71b8.firebasestorage.app",
  messagingSenderId: "192859169585",
  appId: "1:192859169585:web:f69faed2334b4d4a1dc610"
  
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;