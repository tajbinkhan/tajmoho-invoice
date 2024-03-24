import { siteTitle } from "@/core/Helpers";
import ProformaInvoiceCreateFormTemplateView from "@/modules/ProformaInvoice/Templates/Form/ProformaInvoiceCreateFormTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Create Proforma Invoice - ${siteTitle}`
};

export default function ProformaInvoiceCreate() {
	return <ProformaInvoiceCreateFormTemplateView />;
}
