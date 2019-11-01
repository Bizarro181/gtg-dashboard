import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.VUE_APP_FB_apiKey,
    authDomain: process.env.VUE_APP_FB_authDomain,
    databaseURL: process.env.VUE_APP_FB_databaseURL,
    projectId: process.env.VUE_APP_FB_projectId,
    storageBucket: process.env.VUE_APP_FB_storageBucket,
    messagingSenderId: process.env.VUE_APP_FB_messagingSenderId,
    appId: process.env.VUE_APP_FB_appId
});

const firestore = firebaseApp.firestore();
firestore.enablePersistence();
// firestore.disableNetwork();

const gamesCollection = firestore.collection( 'games' );
const teamsCollection = firestore.collection( 'teams' );

export{
	firebase,
	firestore,
	gamesCollection,
	teamsCollection
};