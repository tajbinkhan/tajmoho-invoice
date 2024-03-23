import ApiResponse from "@/core/ApiResponse";
import ClientsController from "@/modules/Clients/Controllers/ClientsController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		return new ClientsController(request, response).show(params.id);
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
		return new ClientsController(request, response).update(params.id);
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { id: string } },
	response: NextResponse
) => {
	try {
		return new ClientsController(request, response).delete(params.id);
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
