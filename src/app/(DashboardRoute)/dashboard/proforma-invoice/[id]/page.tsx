import ProformaInvoiceUpdateFormTemplateView from "@/modules/ProformaInvoice/Templates/Form/ProformaInvoiceUpdateFormTemplateView";
import { Metadata } from "next";
import { siteTitle } from "@/core/Helpers";

export const metadata: Metadata = {
	title: `Update Proforma Invoice - ${siteTitle}`
};

export default function ProformaInvoiceUpdate({ params }: { params: { id: string } }) {
	return <ProformaInvoiceUpdateFormTemplateView id={params.id} />;
}
