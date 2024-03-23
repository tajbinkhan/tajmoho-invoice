import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import ProformaInvoiceCreateAction from "@/modules/ProformaInvoice/Actions/ProformaInvoiceAction";
import ProformaInvoiceRepository from "@/modules/ProformaInvoice/Repositories/ProformaInvoiceRepository";
import { ProformaInvoiceServerSchema } from "@/validators/ProformaInvoice.schema";
import { NextRequest, NextResponse } from "next/server";

export default class ProformaInvoiceController extends ApiController implements ApiCrudController {
	private ProformaInvoiceRepo: ProformaInvoiceRepository;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.ProformaInvoiceRepo = new ProformaInvoiceRepository();
	}

	async index() {
		try {
			const ProformaInvoice = await this.ProformaInvoiceRepo.retrieveAll();

			return ApiResponse.success(
				"All proforma invoices retrieved successfully",
				ProformaInvoice
			);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();
			const parse = ProformaInvoiceServerSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const executeData = new ProformaInvoiceCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created("Proforma invoice created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.ProformaInvoiceRepo.retrieve(id);

			return ApiResponse.success("Proforma invoice retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();
			const parse = ProformaInvoiceServerSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const updateData = await this.ProformaInvoiceRepo.update(id, body);

			return ApiResponse.success("Proforma invoice updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async delete(id: string) {
		try {
			await this.ProformaInvoiceRepo.delete(id);

			return ApiResponse.success("Proforma invoice deleted successfully");
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.ProformaInvoiceRepo.deleteAll();

			return ApiResponse.success("All proforma invoices deleted successfully", deleteData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
