import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  // Paste Your keys here
  apiKey: "AIzaSyCy4P64HIBOIkoJAi6U2mWjuNNm-yGCypo",
  authDomain: "crud-application-32011.firebaseapp.com",
  projectId: "crud-application-32011",
  storageBucket: "crud-application-32011.appspot.com",
  messagingSenderId: "656762842649",
  appId: "1:656762842649:web:0caa0bb81b305263530488",
  measurementId: "G-M3LFQDC4DH",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
// Initialize Firebase
// let app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
