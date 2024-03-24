import ApiResponse from "@/core/ApiResponse";
import ProfileController from "@/modules/Profile/Controllers/ProfileController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		return new ProfileController(request, response).show(params.id);
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const PUT = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		return new ProfileController(request, response).update(params.id);
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
