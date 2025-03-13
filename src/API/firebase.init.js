import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  VITE_apiKey: "AIzaSyAHWwg1vxloTSSG_X5B3NwrufUH8zBqGVI",
  authDomain: "easy-visa-front.firebaseapp.com",
  projectId: "easy-visa-front",
  storageBucket: "easy-visa-front.firebasestorage.app",
  messagingSenderId: "835150769339",
  appId: "1:835150769339:web:ceead1e9b1953e9b9fcd9e",
  measurementId: "G-NNLT003KRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
