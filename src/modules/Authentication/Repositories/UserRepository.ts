import { errors } from "@/core/Errors";
import { throwIf } from "@/core/Helpers";
import JwtService from "@/core/JWTService";
import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { PasswordChangeSchemaType } from "@/validators/PasswordChange.schema";
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
	protected accountModel: PrismaClient["account"];

	/**
	 * Initializes a new instance of the UserRepository class.
	 */
	constructor() {
		super();
		this.modelName = "user"; // In Prisma, the model name is usually singular.
		this.accountModelName = "account"; // In Prisma, the model name is usually singular.
		this.accountModel = this.client[this.accountModelName] as any;
		this.clientModel = this.client[this.modelName] as any;
	}

	async create(data: UserCreateInterface): Promise<User> {
		try {
			const findUser = await this.findByEmail(data.email);
			throwIf(findUser, errors.userAlreadyExists);

			const createUser = await this.clientModel.create({
				data
			});

			return Promise.resolve(createUser);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

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
			throwIf(!checkEmail, errors.userNotFound);
			const checkVerification = await this.clientModel.findUnique({
				where: { email },
				select: { userVerified: true }
			});
			throwIf(!checkVerification?.userVerified, errors.userIsNotVerified);
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
				throwIf(!accountUserId, errors.invalidUserAccountId);

				const user: any = await this.findById(accountUserId);
				throwIf(!user, errors.invalidUser);

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
				const user: any = await this.findByEmail(credentials.email);

				throwIf(!user?.id || !user?.password, errors.invalidUserCredentials);
				const passwordVerified = await compare(credentials.password, user.password!);

				throwIf(!passwordVerified, errors.invalidUserCredentials);

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

	async changePassword(id: string, data: PasswordChangeSchemaType): Promise<User> {
		try {
			const findUser = await this.retrieve(id);
			throwIf(!findUser, errors.userNotFound);

			const checkPassword = await bcrypt.compare(data.oldPassword, findUser?.password!);
			throwIf(!checkPassword, errors.oldPasswordNotMatch);

			const hashPassword = await bcrypt.hash(data.newPassword, 10);

			const compareNewPassword = await bcrypt.compare(data.oldPassword, hashPassword);
			throwIf(compareNewPassword, errors.newPasswordCannotBeSame);

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
				return Promise.reject(errors.userNotFound);
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
				return Promise.reject(errors.userNotFound);
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
