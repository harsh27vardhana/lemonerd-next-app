import firebase from "firebase/app";
import "firebase/auth";

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    })
  : firebase.app();

export const auth = app.auth();

export default app;
