import ApiResponse from "@/core/ApiResponse";
import DocumentDetailsController from "@/modules/DocumentDetails/Controllers/DocumentDetailsController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return new DocumentDetailsController(request, response).retrieveLast();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new DocumentDetailsController(request, response).create();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
	try {
		return new DocumentDetailsController(request, response).deleteAll();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
