import { errors } from "@/core/Errors";
import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import UserRepository from "@/modules/Authentication/Repositories/UserRepository";
import { PrismaClient, TokenType, User } from "@prisma/client";

/**
 * TokenRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class TokenRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected clientModel: PrismaClient["verificationRequest"];
	protected userModel: UserRepository;

	/**
	 * Initializes a new instance of the TokenRepository class.
	 */
	constructor() {
		super();
		this.modelName = "verificationRequest"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName] as any;
		this.userModel = new UserRepository();
	}

	async deleteToken(
		token: string,
		tokenType: TokenType
	): Promise<TokenInterface | string | undefined | null> {
		try {
			const findToken = await this.clientModel.findFirst({
				where: {
					token: token,
					tokenType: tokenType
				}
			});

			if (!findToken) {
				return Promise.resolve("Token already deleted");
			}

			const deleteTheToken = await this.clientModel.deleteMany({
				where: {
					token: token,
					tokenType: tokenType
				}
			});

			return Promise.resolve(deleteTheToken.count.toString());
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async passwordResetTokenVerification(
		tokenType: TokenType,
		token: string,
		password: string
	): Promise<User | null> {
		try {
			const passwordResetToken = await this.clientModel.findFirst({
				where: {
					token: token,
					expires: {
						gt: new Date()
					},
					tokenType: tokenType
				}
			});

			if (!passwordResetToken) {
				return Promise.reject(errors.invalidToken);
			}

			const email = passwordResetToken.identifier;

			const updateUserPassword = await this.userModel.resetPasswordAfterTokenVerification(
				email,
				password
			);

			await this.deleteToken(token, tokenType);

			return Promise.resolve(updateUserPassword);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async userTokenVerification(tokenType: TokenType, token: string): Promise<User | null> {
		try {
			const userVerificationToken = await this.clientModel.findFirst({
				where: {
					token: token,
					expires: {
						gt: new Date()
					},
					tokenType: tokenType
				}
			});

			if (!userVerificationToken) {
				return Promise.reject(errors.invalidToken);
			}

			const updateUserVerificationStatus = await this.userModel.verifyUserAccount(
				userVerificationToken.identifier
			);

			await this.deleteToken(token, tokenType);

			return Promise.resolve(updateUserVerificationStatus);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
