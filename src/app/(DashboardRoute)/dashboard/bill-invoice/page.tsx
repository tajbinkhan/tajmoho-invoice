import BillInvoicePageView from "@/components/templates/Dashboard/BillInvoice/BillInvoicePageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Bill Invoice - ${siteTitle}`
};

export default function DashboardBillInvoice() {
	return <BillInvoicePageView />;
}
