import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { ClientsSchemaType } from "@/validators/Clients.schema";
import { Clients, PrismaClient } from "@prisma/client";

/**
 * ClientsRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class ClientsRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected clientModel: PrismaClient["clients"];

	/**
	 * Initializes a new instance of the ClientsRepository class.
	 */
	constructor() {
		super();
		this.modelName = "clients"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName] as any;
	}

	async create(data: ClientsSchemaType): Promise<Clients> {
		try {
			const createData = await this.clientModel.create({
				data
			});
			return Promise.resolve(createData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieve(id: string): Promise<Clients | null> {
		try {
			const retrieveData = await this.clientModel.findUnique({
				where: { id }
			});

			return Promise.resolve(retrieveData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async update(id: string, data: ClientsSchemaType): Promise<Clients> {
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

	async delete(id: string): Promise<Clients> {
		try {
			const deleteData = await this.clientModel.delete({
				where: { id }
			});
			return Promise.resolve(deleteData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieveAll(): Promise<Clients[]> {
		try {
			const retrieveAllData = await this.clientModel.findMany();

			return Promise.resolve(retrieveAllData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async deleteAll(): Promise<number> {
		try {
			const deleteAllData = await this.clientModel.deleteMany();

			return Promise.resolve(deleteAllData.count);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}
}
