import { throwIf } from "@/core/Helpers";
import JwtService from "@/core/JWTService";
import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { PrismaClient, User } from "@prisma/client";
import bcrypt, { compare } from "bcryptjs";

/**
 * UserRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class UserRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected accountModelName: any | string;
	protected clientModel: PrismaClient["user"];
	protected accountModel: any;

	/**
	 * Initializes a new instance of the UserRepository class.
	 */
	constructor() {
		super();
		this.modelName = "user"; // In Prisma, the model name is usually singular.
		this.accountModelName = "account";
		this.accountModel = this.client[this.accountModelName];
		this.clientModel = this.client[this.modelName] as any;
	}

	/**
	 * Creates a new user record in the database.
	 *
	 * @param data - Object containing the user's data.
	 * @returns The newly created user record.
	 */
	async create(data: UserCreateInterface): Promise<User> {
		try {
			const findUser = await this.findByEmail(data.email);
			throwIf(findUser, "User already exists");

			const createUser = await this.clientModel.create({
				data
			});

			return Promise.resolve(createUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	/**
	 * Retrieves a user record by its unique identifier.
	 *
	 * @param id - Unique identifier of the user to retrieve.
	 * @returns The user record if found, otherwise null.
	 */
	async retrieve(id: string): Promise<User | null> {
		try {
			const user = await this.clientModel.findUnique({
				where: { id }
			});

			return Promise.resolve(user);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	/**
	 * Updates a user record identified by its unique identifier with new data.
	 *
	 * @param id - Unique identifier of the user to update.
	 * @param data - Object containing the new data for the user.
	 * @param query - Optional query parameters (not used in this simple implementation).
	 * @returns The updated user record.
	 */
	async update(id: string, data: UserUpdateInterface): Promise<User> {
		try {
			const updateUser = await this.clientModel.update({
				where: { id },
				data
			});
			return Promise.resolve(updateUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	/**
	 * Deletes a user record from the database by its unique identifier.
	 *
	 * @param id - Unique identifier of the user to delete.
	 * @param query - Optional query parameters (not used in this simple implementation).
	 * @returns The deleted user record.
	 */
	async delete(id: string): Promise<User> {
		try {
			const deleteUser = await this.clientModel.delete({
				where: { id }
			});
			return Promise.resolve(deleteUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieveAll(): Promise<User[]> {
		try {
			const users = await this.clientModel.findMany();

			return Promise.resolve(users);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async deleteAll(): Promise<number> {
		try {
			const deleteAll = await this.clientModel.deleteMany();

			return Promise.resolve(deleteAll.count);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async deleteAllWithIds(ids: string[]): Promise<number> {
		try {
			const deleteAll = await this.clientModel.deleteMany({
				where: {
					id: {
						in: ids
					}
				}
			});

			return Promise.resolve(deleteAll.count);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	/**
	 * Finds a user record by its unique identifier.
	 * This method is similar to 'read' and can be used interchangeably.
	 *
	 * @param id - Unique identifier of the user to find.
	 * @returns The user record if found, otherwise null.
	 */
	async findById(id: string): Promise<User | null> {
		try {
			const user = await this.retrieve(id);

			return Promise.resolve(user);
		} catch (error: any) {
			return Promise.resolve(null);
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		try {
			const user = await this.clientModel.findUnique({
				where: { email: email }
			});

			return Promise.resolve(user);
		} catch (e) {
			return Promise.resolve(null);
		}
	}

	async checkVerification(email: string): Promise<boolean> {
		try {
			const checkEmail = await this.findByEmail(email);
			throwIf(!checkEmail, "User not found");
			const checkVerification = await this.clientModel.findUnique({
				where: { email },
				select: { userVerified: true }
			});
			throwIf(!checkVerification?.userVerified, "User is not verified");
			return Promise.resolve(checkVerification!.userVerified as boolean);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async tokenAuth(credentials: Credentials): Promise<string> {
		try {
			const isProviderLogin = credentials?.isProviderLogin || false;
			const providerAccountId = credentials?.isProviderAccountId || false;

			if (isProviderLogin && providerAccountId) {
				let account: any = await this.accountModel.findFirst({
					where: {
						providerAccountId: providerAccountId
					}
				});

				const accountUserId = account?.userId;
				throwIf(!accountUserId, "Invalid userId found in Account");

				// TODO: Find the user using id or throw exception
				const user: any = await this.findById(accountUserId);
				throwIf(!user, "Invalid user found");

				// TODO: Generate JWT token using user information
				const userJwtData = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					emailVerified: user.emailVerified,
					userVerified: user.userVerified
				};

				const userToken = JwtService.generateToken(userJwtData, "24h", false);

				return Promise.resolve(userToken);
			} else {
				// TODO: Find the user using email address or throw exception
				const user: any = await this.findByEmail(credentials.email);

				// TODO: find the user password if not provided in the request
				// TODO: find the user password from the co

				throwIf(!user?.id || !user?.password, "Invalid user credentials");

				// TODO: verify the user password or throw exception
				const passwordVerified = await compare(credentials.password, user.password!);

				throwIf(!passwordVerified, "Invalid user credentials.");

				// TODO: Generate JWT token using user information
				const userJwtData = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					emailVerified: user.emailVerified,
					userVerified: user.userVerified
				};

				const userToken = JwtService.generateToken(userJwtData, "24h", false);

				return Promise.resolve(userToken);
			}
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async userAuthorization(credentials: Credentials): Promise<User | null> {
		try {
			const checkTheUser = await this.findByEmail(credentials.email);
			if (!checkTheUser) {
				return Promise.resolve(null);
			}

			const checkPassword = await bcrypt.compare(
				credentials.password,
				checkTheUser.password!
			);
			if (!checkPassword) {
				return Promise.resolve(null);
			}

			return Promise.resolve(checkTheUser as User);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async changePassword(id: string, data: ChangePasswordInterface): Promise<User> {
		try {
			const findUser = await this.retrieve(id);
			throwIf(!findUser, "User not found");

			const checkPassword = await bcrypt.compare(data.oldPassword, findUser?.password!);
			throwIf(!checkPassword, "Old password is incorrect");

			const hashPassword = await bcrypt.hash(data.newPassword, 10);

			const compareNewPassword = await bcrypt.compare(data.oldPassword, hashPassword);
			throwIf(compareNewPassword, "New password can not be same as old password");

			const updateUser = await this.clientModel.update({
				where: { id },
				data: { password: hashPassword }
			});

			return Promise.resolve(updateUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async resetPasswordAfterTokenVerification(email: string, password: string): Promise<User> {
		try {
			const findUser = await this.findByEmail(email);
			if (!findUser) {
				return Promise.reject("User not found");
			}

			const hashPassword = await bcrypt.hash(password, 10);
			const updateUser = await this.clientModel.update({
				where: { email },
				data: { password: hashPassword }
			});

			return Promise.resolve(updateUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async verifyUserAccount(email: string): Promise<User> {
		try {
			const findUser = await this.findByEmail(email);
			if (!findUser) {
				return Promise.reject("User not found");
			}

			const updateUser = await this.clientModel.update({
				where: { email },
				data: { userVerified: true, emailVerified: new Date() }
			});

			return Promise.resolve(updateUser);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
