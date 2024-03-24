import { Env } from "@/core/Env";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

interface FirebaseAppConfigInterface {
	apiKey: string | undefined;
	authDomain: string | undefined;
	projectId: string | undefined;
	storageBucket: string | undefined;
	messagingSenderId: string | undefined;
	appId: string | undefined;
}

export class FirebaseApp {
	public firebaseConfig: FirebaseAppConfigInterface;
	public app;
	public auth;
	public firestore;
	public firebaseStorage;

	constructor() {
		this.firebaseConfig = this.getFirebaseConfig();

		this.app = getApps().length === 0 ? initializeApp(this.firebaseConfig) : getApp();

		this.auth = getAuth(this.app);
		this.firestore = getFirestore(this.app);
		this.firebaseStorage = getStorage(this.app);
	}

	private getFirebaseConfig(): FirebaseAppConfigInterface {
		return {
			apiKey: Env.FIREBASE_API_KEY,
			authDomain: Env.FIREBASE_AUTH_DOMAIN,
			projectId: Env.FIREBASE_PROJECT_ID,
			storageBucket: Env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: Env.FIREBASE_MESSAGING_SENDER_ID,
			appId: Env.FIREBASE_APP_ID
		};
	}
}

export const firebaseAuth = new FirebaseApp().auth;

export const firebaseConfig = new FirebaseApp();
export const firebaseApp = new FirebaseApp();

export const firebaseDb = new FirebaseApp().firestore;
