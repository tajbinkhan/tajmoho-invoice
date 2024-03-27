import BaseAction from "@/core/BaseAction";
import BillInvoiceRepository from "@/modules/BillInvoice/Repositories/BillInvoiceRepository";
import { BillInvoiceServerSchemaType } from "@/validators/BillInvoice.schema";
import { BillInvoice } from "@prisma/client";

export default class BillInvoiceCreateAction extends BaseAction {
	private BillInvoiceRepository: BillInvoiceRepository;

	constructor() {
		super();

		this.BillInvoiceRepository = new BillInvoiceRepository();
	}

	async execute(data: BillInvoiceServerSchemaType): Promise<BillInvoice> {
		try {
			const execute = await this.BillInvoiceRepository.create(data);

			return Promise.resolve(execute);
		} catch (e: any) {
			console.log("BillInvoiceCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
