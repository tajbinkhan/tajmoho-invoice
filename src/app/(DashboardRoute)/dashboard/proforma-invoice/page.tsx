import { siteTitle } from "@/core/Helpers";
import ProformaInvoiceTemplateView from "@/modules/ProformaInvoice/Templates/ProformaInvoiceTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Proforma Invoice - ${siteTitle}`
};

export default function DashboardProformaInvoice() {
	return <ProformaInvoiceTemplateView />;
}
