import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { ProfileSchemaType } from "@/validators/Profile.schema";
import { PrismaClient, User } from "@prisma/client";

/**
 * ProfileRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class ProfileRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected clientModel: PrismaClient["user"];

	/**
	 * Initializes a new instance of the ProfileRepository class.
	 */
	constructor() {
		super();
		this.modelName = "user"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName] as any;
	}

	async retrieve(id: string): Promise<User | null> {
		try {
			const retrieveData = await this.clientModel.findFirst({
				where: { id }
			});

			return Promise.resolve(retrieveData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async update(id: string, data: ProfileSchemaType): Promise<User> {
		try {
			const updateData = await this.clientModel.update({
				where: { id },
				data
			});
			return Promise.resolve(updateData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}
}
