import { route } from "@/routes/routes";
import { User } from "@prisma/client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Define the return type for the useAuth hook
interface UseAuthReturn {
	user: User | null;
	accessToken: string | null;
	loading: boolean;
	authenticated: boolean;
	unauthenticated: boolean;
}

// Define the useAuth hook
const useAuth = (callbackUrl?: string): UseAuthReturn => {
	// State variables for the access token and authenticated user data
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [authUserData, setAuthUserData] = useState<any>(null);

	// Use the next-auth/react useSession hook to get the user session data
	const { data: session, status } = useSession();

	// Determine if the session is still loading
	const loading = status === "loading";

	const authenticated = status === "authenticated";

	const unauthenticated = status === "unauthenticated";

	// Effect to handle authentication logic when the session changes
	useEffect(() => {
		// Check if a user session exists
		if (session) {
			// Extract the access token from the session data
			const token = session.accessToken as string;
			setAccessToken(token);

			// Function to verify the token and retrieve user data
			const verifyToken = async () => {
				try {
					// Make a request to the user API route to get user data
					const authUserData: any = await axios
						.get(`${route.apiRoute.userAuthentication}`)
						.then(res => res.data.data);

					// Extract user data from the response
					const userData = authUserData?.user;

					// Check if user data contains a valid user ID
					const isVerified = !!userData?.id;

					// Set the authenticated user data in the state
					setAuthUserData(userData);

					// Resolve the promise with the verification status
					return Promise.resolve(isVerified);
				} catch (e) {
					// Handle errors and resolve the promise with false if verification fails
					return Promise.resolve(false);
				}
			};

			// Call the verifyToken function and handle the result
			verifyToken().then(isValid => {
				// If the token is not valid, sign the user out and redirect to the login page
				if (!isValid) {
					signOut({
						callbackUrl: callbackUrl || "/"
					});
				}
			});
		} else {
			// If no user session exists, set the access token to null
			setAccessToken(null);
		}
	}, [callbackUrl, session]); // Re-run the effect when the session changes

	// Return the authenticated user data, access token, and loading status
	return {
		user: authUserData,
		accessToken,
		loading,
		authenticated,
		unauthenticated
	};
};

// Export the useAuth hook
export default useAuth;
