import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCfptfii7PxfFFMb3tBNuSnTpk9RTm-PYI",
	authDomain: "pokevue-7556b.firebaseapp.com",
	projectId: "pokevue-7556b",
	storageBucket: "pokevue-7556b.appspot.com",
	messagingSenderId: "225175084540",
	appId: "1:225175084540:web:9abf8b82bfb2ea20bee679",
	measurementId: "G-9G667FTNZ2",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
