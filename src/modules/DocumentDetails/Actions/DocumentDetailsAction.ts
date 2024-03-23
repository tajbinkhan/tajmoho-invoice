import BaseAction from "@/core/BaseAction";
import DocumentDetailsRepository from "@/modules/DocumentDetails/Repositories/DocumentDetailsRepository";
import { DocumentDetailsSchemaType } from "@/validators/DocumentDetails.schema";
import { DocumentDetails } from "@prisma/client";

export default class DocumentDetailsCreateAction extends BaseAction {
	private DocumentDetailsRepository: DocumentDetailsRepository;

	constructor() {
		super();

		this.DocumentDetailsRepository = new DocumentDetailsRepository();
	}

	async execute(data: DocumentDetailsSchemaType): Promise<DocumentDetails> {
		try {
			const execute = await this.DocumentDetailsRepository.create(data);

			return Promise.resolve(execute);
		} catch (e: any) {
			console.log("DocumentDetailsCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
