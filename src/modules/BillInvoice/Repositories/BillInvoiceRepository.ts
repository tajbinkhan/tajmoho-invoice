import PrismaBaseRepository from "@/database/adapters/Prisma/PrismaBaseRepository";
import { BillInvoiceServerSchemaType } from "@/validators/BillInvoice.schema";
import { BillInvoice, PrismaClient } from "@prisma/client";

/**
 * BillInvoiceRepository is responsible for handling operations regarding the User entity.
 * It communicates with the 'users' table in the database and contains methods to
 * create, read, update, delete, and query user records.
 */
export default class BillInvoiceRepository extends PrismaBaseRepository {
	protected modelName: any | string;
	protected clientModel: PrismaClient["billInvoice"];

	/**
	 * Initializes a new instance of the BillInvoiceRepository class.
	 */
	constructor() {
		super();
		this.modelName = "billInvoice"; // In Prisma, the model name is usually singular.
		this.clientModel = this.client[this.modelName] as any;
	}

	async create(data: BillInvoiceServerSchemaType): Promise<BillInvoice> {
		try {
			const createData = await this.clientModel.create({
				data
			});
			return Promise.resolve(createData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieve(id: string): Promise<BillInvoice | null> {
		try {
			const retrieveData = await this.clientModel.findUnique({
				where: { id },
				include: {
					client: true
				}
			});

			return Promise.resolve(retrieveData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async update(id: string, data: BillInvoiceServerSchemaType): Promise<BillInvoice> {
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

	async delete(id: string): Promise<BillInvoice> {
		try {
			const deleteData = await this.clientModel.delete({
				where: { id }
			});
			return Promise.resolve(deleteData);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	async retrieveAll(): Promise<BillInvoice[]> {
		try {
			const retrieveAllData = await this.clientModel.findMany({
				include: {
					client: true
				},
				orderBy: {
					createdAt: "desc"
				}
			});

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
