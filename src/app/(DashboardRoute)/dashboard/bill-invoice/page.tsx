import { siteTitle } from "@/core/Helpers";
import BillInvoiceTemplateView from "@/modules/BillInvoice/Templates/BillInvoiceTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Bill Invoice - ${siteTitle}`
};

export default function DashboardBillInvoice() {
	return <BillInvoiceTemplateView />;
}
