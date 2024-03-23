import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import ClientsCreateAction from "@/modules/Clients/Actions/ClientsAction";
import ClientsRepository from "@/modules/Clients/Repositories/ClientsRepository";
import { ClientsSchema } from "@/validators/Clients.schema";
import { NextRequest, NextResponse } from "next/server";

export default class ClientsController extends ApiController implements ApiCrudController {
	private clientsRepo: ClientsRepository;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.clientsRepo = new ClientsRepository();
	}

	async index() {
		try {
			const clients = await this.clientsRepo.retrieveAll();

			return ApiResponse.success("All clients retrieved successfully", clients);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();
			const parse = ClientsSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const executeData = new ClientsCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created("Clients created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.clientsRepo.retrieve(id);

			return ApiResponse.success("Clients retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();
			const parse = ClientsSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const updateData = await this.clientsRepo.update(id, body);

			return ApiResponse.success("Clients updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async delete(id: string) {
		try {
			await this.clientsRepo.delete(id);

			return ApiResponse.success("Clients deleted successfully");
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.clientsRepo.deleteAll();

			return ApiResponse.success("All clients deleted successfully", deleteData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
