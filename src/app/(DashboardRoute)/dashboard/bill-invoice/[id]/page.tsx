import { siteTitle } from "@/core/Helpers";
import BillInvoiceUpdateFormTemplateView from "@/modules/BillInvoice/Templates/Form/BillInvoiceUpdateFormTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Update Bill Invoice - ${siteTitle}`
};

export default function BillInvoiceUpdate({ params }: { params: { id: string } }) {
	return <BillInvoiceUpdateFormTemplateView id={params.id} />;
}
