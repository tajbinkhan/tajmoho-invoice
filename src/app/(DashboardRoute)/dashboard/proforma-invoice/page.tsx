import ProformaInvoicePageView from "@/components/templates/Dashboard/ProformaInvoice/ProformaInvoicePageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Proforma Invoice - ${siteTitle}`
};

export default function DashboardProformaInvoice() {
	return <ProformaInvoicePageView />;
}
