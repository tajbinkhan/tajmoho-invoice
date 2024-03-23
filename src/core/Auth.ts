import { prisma } from "@/database/adapters/Prisma/PrismaClientAdapter";
import { route } from "@/routes/routes";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Env } from "./Env";

export const authOptions: NextAuthOptions = {
	secret: Env.NEXTAUTH_SECRET,
	jwt: {
		secret: Env.NEXTAUTH_SECRET
	},
	// useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
	useSecureCookies: false,
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/login"
	},

	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60 // 24 hours
	},

	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@example.com"
				},
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				try {
					// TODO: Get user access token using user given credentials
					const accessToken = await axios
						.post(`${route.apiRoute.tokenAuthentication}`, credentials)
						.then(res => res.data.data.accessToken);

					if (accessToken) {
						const user = await axios
							.get(`${route.apiRoute.userAuthentication}`, {
								headers: {
									Authorization: `Bearer ${accessToken}`
								}
							})
							.then(res => res?.data?.data);

						return {
							id: user.id,
							email: user.email,
							name: user.name,
							accessToken: accessToken
						};
					} else {
						return null;
					}
				} catch (e: any) {
					return null;
				}
			}
		})
	],

	callbacks: {
		signIn: async ({ user, account }) => {
			const signedInUser: any = user;

			// Only for Credentials Provider
			if (account?.provider === "credentials" && signedInUser?.accessToken !== undefined) {
				return true;
			}

			// Only for Google Provider
			if (
				account?.provider === "google" &&
				account.providerAccountId &&
				account?.access_token
			) {
				return true;
			}

			return false;
		},
		jwt: async ({ token, user, account }) => {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account?.access_token || account?.accessToken;
			}

			if (user) {
				const u = user as unknown as any;

				return {
					...token,
					id: u.id,
					accessToken: u.accessToken
				};
			}

			return token;
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					accessToken: token.accessToken
				}
			};
		}
	}
};
