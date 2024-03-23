import ApiResponse from "@/core/ApiResponse";
import ProformaInvoiceController from "@/modules/ProformaInvoice/Controllers/ProformaInvoiceController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ProformaInvoiceController(request, response).index();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ProformaInvoiceController(request, response).create();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
	try {
		return new ProformaInvoiceController(request, response).deleteAll();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
