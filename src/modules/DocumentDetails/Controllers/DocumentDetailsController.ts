import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import DocumentDetailsCreateAction from "@/modules/DocumentDetails/Actions/DocumentDetailsAction";
import DocumentDetailsRepository from "@/modules/DocumentDetails/Repositories/DocumentDetailsRepository";
import { DocumentDetailsSchema } from "@/validators/DocumentDetails.schema";
import { NextRequest, NextResponse } from "next/server";

export default class DocumentDetailsController extends ApiController implements ApiCrudController {
	private DocumentDetailsRepo: DocumentDetailsRepository;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.DocumentDetailsRepo = new DocumentDetailsRepository();
	}

	async index() {
		try {
			const DocumentDetails = await this.DocumentDetailsRepo.retrieveAll();

			return ApiResponse.success(
				"All document details retrieved successfully",
				DocumentDetails
			);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();
			const parse = DocumentDetailsSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const executeData = new DocumentDetailsCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created("Document details created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.DocumentDetailsRepo.retrieve(id);

			return ApiResponse.success("Document details retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();
			const parse = DocumentDetailsSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const updateData = await this.DocumentDetailsRepo.update(id, body);

			return ApiResponse.success("Document details updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async delete(id: string) {
		try {
			await this.DocumentDetailsRepo.delete(id);

			return ApiResponse.success("Document details deleted successfully");
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.DocumentDetailsRepo.deleteAll();

			return ApiResponse.success("All document details deleted successfully", deleteData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async retrieveLast() {
		try {
			const retrieveData = await this.DocumentDetailsRepo.retrieveLast();

			return ApiResponse.success("Document details retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
