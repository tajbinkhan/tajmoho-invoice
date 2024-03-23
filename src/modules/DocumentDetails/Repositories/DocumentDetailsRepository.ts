import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { DocumentDetailsSchemaType } from "@/validators/DocumentDetails.schema";
import { DocumentDetails, PrismaClient } from "@prisma/client";

/**
 * DocumentDetailsRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class DocumentDetailsRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected clientModel: PrismaClient["documentDetails"];

	/**
	 * Initializes a new instance of the DocumentDetailsRepository class.
	 */
	constructor() {
		super();
		this.modelName = "documentDetails"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName] as any;
	}

	async create(data: DocumentDetailsSchemaType): Promise<DocumentDetails> {
		try {
			const createData = await this.clientModel.create({
				data
			});
			return Promise.resolve(createData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieve(id: string): Promise<DocumentDetails | null> {
		try {
			const retrieveData = await this.clientModel.findFirst({
				where: { id }
			});

			return Promise.resolve(retrieveData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async update(id: string, data: DocumentDetailsSchemaType): Promise<DocumentDetails> {
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

	async delete(id: string): Promise<DocumentDetails> {
		try {
			const deleteData = await this.clientModel.delete({
				where: { id }
			});
			return Promise.resolve(deleteData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieveAll(): Promise<DocumentDetails[]> {
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

	async retrieveLast(): Promise<DocumentDetails | null> {
		try {
			const retrieveLastData = await this.clientModel.findFirst({
				orderBy: { createdAt: "desc" }
			});

			return Promise.resolve(retrieveLastData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}
}
