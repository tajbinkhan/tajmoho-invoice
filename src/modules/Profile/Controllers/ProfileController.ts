import { ApiController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import ProfileRepository from "@/modules/Profile/Repositories/ProfileRepository";
import { ProfileSchema } from "@/validators/Profile.schema";
import { NextRequest, NextResponse } from "next/server";

export default class ProfileController extends ApiController {
	private ProfileRepo: ProfileRepository;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.ProfileRepo = new ProfileRepository();
	}

	async show(id: string) {
		try {
			const retrieveData = await this.ProfileRepo.retrieve(id);

			return ApiResponse.success("Profile retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();
			const parse = ProfileSchema.safeParse(body);

			if (!parse.success) {
				return ApiResponse.badRequest("Invalid form submission data");
			}

			const updateData = await this.ProfileRepo.update(id, body);

			return ApiResponse.success("Profile updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}
}
