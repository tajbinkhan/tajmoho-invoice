import ApiResponse from "@/core/ApiResponse";
import UserController from "@/modules/Authentication/Controllers/UserController";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new UserController(request, response).passwordResetEmailSend();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
