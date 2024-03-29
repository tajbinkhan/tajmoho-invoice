import ApiResponse from "@/core/ApiResponse";
import BillInvoiceRepository from "@/modules/BillInvoice/Repositories/BillInvoiceRepository";
import ClientsRepository from "@/modules/Clients/Repositories/ClientsRepository";
import ProformaInvoiceRepository from "@/modules/ProformaInvoice/Repositories/ProformaInvoiceRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		const getProformaInvoiceStats = (await new ProformaInvoiceRepository().retrieveAll())
			.length;
		const getBillInvoiceStats = (await new BillInvoiceRepository().retrieveAll()).length;
		const getClientsStats = (await new ClientsRepository().retrieveAll()).length;

		const combinedStats = await Promise.all([
			getProformaInvoiceStats,
			getBillInvoiceStats,
			getClientsStats
		]);

		return ApiResponse.success("Retrieved All The Stats", combinedStats);
	} catch (error) {
		return ApiResponse.error("Failed to retrieve the stats", error);
	}
};
