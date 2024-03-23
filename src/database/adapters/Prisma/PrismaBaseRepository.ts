import { PrismaClient } from "@prisma/client";
import PrismaClientAdapter from "./PrismaClientAdapter";

export default abstract class PrismaBaseRepository {
	protected abstract modelName: string;
	protected abstract clientModel: any;
	protected client: PrismaClient;

	constructor() {
		this.client = PrismaClientAdapter;
	}
}
