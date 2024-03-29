import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import BillInvoiceCreateAction from "@/modules/BillInvoice/Actions/BillInvoiceAction";
import BillInvoiceRepository from "@/modules/BillInvoice/Repositories/BillInvoiceRepository";
import { BillInvoiceServerSchema } from "@/validators/BillInvoice.schema";
import { NextRequest, NextResponse } from "next/server";

export default class BillInvoiceController extends ApiController implements ApiCrudController {
	private BillInvoiceRepo: BillInvoiceRepository;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.BillInvoiceRepo = new BillInvoiceRepository();
	}

	async index() {
		try {
			const BillInvoice = await this.BillInvoiceRepo.retrieveAll();

			return ApiResponse.success("All bill invoices retrieved successfully", BillInvoice);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();
			const filteredData = {
				...body,
				billDate: new Date(body.billDate)
			};
			const parse = BillInvoiceServerSchema.safeParse(filteredData);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const executeData = new BillInvoiceCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created("Bill invoice created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.BillInvoiceRepo.retrieve(id);

			return ApiResponse.success("Bill invoice retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();
			const filteredData = {
				...body,
				billDate: new Date(body.billDate)
			};
			const parse = BillInvoiceServerSchema.safeParse(filteredData);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const updateData = await this.BillInvoiceRepo.update(id, body);

			return ApiResponse.success("Bill invoice updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async delete(id: string) {
		try {
			await this.BillInvoiceRepo.delete(id);

			return ApiResponse.success("Bill invoice deleted successfully");
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.BillInvoiceRepo.deleteAll();

			return ApiResponse.success("All bill invoices deleted successfully", deleteData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
