
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDU1RJ9s2S3RTj5KACn9CjYx18BOWT5rU",
authDomain: "dzshop-73eec.firebaseapp.com",
projectId: "dzshop-73eec",
storageBucket: "dzshop-73eec.appspot.com",
messagingSenderId: "765726173475",
appId: "1:765726173475:web:17da41ee2b8d35b74fc7d6",
measurementId: "G-W6G00XH76R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);