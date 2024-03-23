import { authOptions } from "@/core/Auth";
import { throwIf } from "@/core/Helpers";
import JwtService from "@/core/JWTService";
import { prisma } from "@/database/adapters/Prisma/PrismaClientAdapter";
import UserRepository from "@/modules/Authentication/Repositories/UserRepository";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const userRepository = new UserRepository();

export async function withAuthUser() {
	try {
		return await getTokenInfo();
	} catch (e: any) {
		throwIf(e, "Unauthorized Access");
	}
}

async function getTokenInfo() {
	try {
		const session: any = await getServerSession(authOptions);
		const sessionUserEmail = session?.user?.email;

		let authAccessToken = await getAuthAccessTokenFromSession(session);

		if (!authAccessToken && sessionUserEmail) {
			console.log(`authAccessToken not found - creating a new one`);

			const findUserByEmail: any = await userRepository.findByEmail(sessionUserEmail);
			throwIf(!findUserByEmail, "User not found");

			// TODO: find the account info
			const userAccount: any = await prisma.account.findFirst({
				where: {
					userId: findUserByEmail.id
				}
			});

			throwIf(!userAccount, "Invalid account Id");

			// TODO: Generate JWT token using user information
			const userJwtData = {
				id: findUserByEmail.id,
				name: findUserByEmail.name,
				email: findUserByEmail.email,
				image: findUserByEmail.image,
				emailVerified: findUserByEmail.emailVerified,
				userVerified: findUserByEmail.userVerified,
				providerAccountId: userAccount.providerAccountId
			};

			const authAccessToken = JwtService.generateToken(userJwtData, "24h", false);

			const user = {
				...findUserByEmail
			};

			return {
				user,
				accessToken: authAccessToken
			};
		} else {
			const user = await getUserFromAccessToken(authAccessToken);

			return {
				user,
				accessToken: authAccessToken
			};
		}
	} catch (error: any) {
		throw new Error("Invalid token");
	}
}

export async function getAuthAccessTokenFromSession(session: any) {
	const sessionUser: any = session?.user || null;
	const headersInstance = headers();
	const authorization = headersInstance.get("Authorization") || "";
	const accessToken = authorization.split(" ")[1] || null;

	return sessionUser?.accessToken || accessToken;
}

async function getUserFromAccessToken(authAccessToken: string) {
	const authUser: any = JwtService.verifyToken(authAccessToken);

	const findUserByEmail = await userRepository.findByEmail(authUser.email);

	if (!findUserByEmail) {
		throw new Error("User not found");
	}

	return {
		...findUserByEmail
	};
}
