import firebase from "firebase/app";
import "firebase/auth";

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: "AIzaSyBgp4zRKz0TYcI91i_dSmP_ow2ZKr9HUBs",
      authDomain: "lemonerd-auth.firebaseapp.com",
      projectId: "lemonerd-auth",
      storageBucket: "lemonerd-auth.appspot.com",
      messagingSenderId: "718718940698",
      appId: "1:718718940698:web:d5f41c42b1bade11ed83a3",
    })
  : firebase.app();

export const auth = app.auth();

export default app;
