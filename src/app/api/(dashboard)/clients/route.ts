import ApiResponse from "@/core/ApiResponse";
import ClientsController from "@/modules/Clients/Controllers/ClientsController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ClientsController(request, response).index();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ClientsController(request, response).create();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ClientsController(request, response).deleteAll();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
