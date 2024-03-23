import BaseAction from "@/core/BaseAction";
import ProformaInvoiceRepository from "@/modules/ProformaInvoice/Repositories/ProformaInvoiceRepository";
import { ProformaInvoiceServerSchemaType } from "@/validators/ProformaInvoice.schema";
import { ProformaInvoice } from "@prisma/client";

export default class ProformaInvoiceCreateAction extends BaseAction {
	private ProformaInvoiceRepository: ProformaInvoiceRepository;

	constructor() {
		super();

		this.ProformaInvoiceRepository = new ProformaInvoiceRepository();
	}

	async execute(data: ProformaInvoiceServerSchemaType): Promise<ProformaInvoice> {
		try {
			const execute = await this.ProformaInvoiceRepository.create(data);

			return Promise.resolve(execute);
		} catch (e: any) {
			console.log("ProformaInvoiceCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
