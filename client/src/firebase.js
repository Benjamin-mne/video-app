import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "video-app-28d9c.firebaseapp.com",
  projectId: "video-app-28d9c",
  storageBucket: "video-app-28d9c.appspot.com",
  messagingSenderId: "752307489978",
  appId: "1:752307489978:web:d76bd5c1f7a5d57117c683"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;