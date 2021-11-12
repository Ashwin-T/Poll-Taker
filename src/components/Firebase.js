import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCV4D7Jy_QHiASq8vvZZdiJ27SpK-HyxBI",
  authDomain: "poll-taker.firebaseapp.com",
  projectId: "poll-taker",
  storageBucket: "poll-taker.appspot.com",
  messagingSenderId: "356874067650",
  appId: "1:356874067650:web:a1ef8a5434afdb49ed255b",
  measurementId: "G-7Z4E0T084X"
}

const app = initializeApp(firebaseConfig);

export default app;
 