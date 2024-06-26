const EMAIL_ENV = {
	EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
	EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
	EMAIL_FROM: process.env.EMAIL_FROM
};

const FirebaseENVConfig = {
	FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const Env = {
	...FirebaseENVConfig,
	...EMAIL_ENV,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	NEXT_PUBLIC_LIVE_BACKEND_API_URL: process.env.NEXT_PUBLIC_LIVE_BACKEND_API_URL,
	NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
	NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL
};
