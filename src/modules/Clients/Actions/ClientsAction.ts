import BaseAction from "@/core/BaseAction";
import ClientsRepository from "@/modules/Clients/Repositories/ClientsRepository";
import { ClientsSchemaType } from "@/validators/Clients.schema";
import { Clients } from "@prisma/client";

export default class ClientsCreateAction extends BaseAction {
	private clientsRepository: ClientsRepository;

	constructor() {
		super();

		this.clientsRepository = new ClientsRepository();
	}

	async execute(data: ClientsSchemaType): Promise<Clients> {
		try {
			const execute = await this.clientsRepository.create(data);

			return Promise.resolve(execute);
		} catch (e: any) {
			console.log("ClientsCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
