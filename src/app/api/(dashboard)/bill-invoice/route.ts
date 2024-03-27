import ApiResponse from "@/core/ApiResponse";
import BillInvoiceController from "@/modules/BillInvoice/Controllers/BillInvoiceController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return new BillInvoiceController(request, response).index();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new BillInvoiceController(request, response).create();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
	try {
		return new BillInvoiceController(request, response).deleteAll();
	} catch (error: any) {
		return ApiResponse.error(error.message, error);
	}
};
