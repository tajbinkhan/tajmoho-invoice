import ApiResponse from "@/core/ApiResponse";
import { withAuthUser } from "@/middlewares/AuthenticationMiddleware";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const authUser = await withAuthUser();

		return ApiResponse.success("User Data", authUser);
	} catch (e) {
		return ApiResponse.error("An error occurred.", e);
	}
}
