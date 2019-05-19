import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyB70wCTCOJJlVgjNJowRfOJEdtZf67AwCE",
    authDomain: "gtg-dashboard.firebaseapp.com",
    databaseURL: "https://gtg-dashboard.firebaseio.com",
    projectId: "gtg-dashboard",
    storageBucket: "gtg-dashboard.appspot.com",
    messagingSenderId: "836676229202",
    appId: "1:836676229202:web:ab9b57ce925fbeea"
});

const db = firebaseApp.firestore();

const gamesCollection = db.collection( 'games' );

export{
	db,
	gamesCollection
};