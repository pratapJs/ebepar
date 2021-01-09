import firebase from "firebase/app";
import "firebase/auth";

// import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDFBis-AR2sRZ_Ym9cr4oP7e5McUvWbpOA",
	authDomain: "ebepar-f3692.firebaseapp.com",
	projectId: "ebepar-f3692",
	storageBucket: "ebepar-f3692.appspot.com",
	messagingSenderId: "231594769121",
	appId: "1:231594769121:web:822984ce4f8eed2bc0d5a0",
	measurementId: "G-T28T636L9J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
