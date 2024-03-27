import { siteTitle } from "@/core/Helpers";
import BillInvoiceCreateFormTemplateView from "@/modules/BillInvoice/Templates/Form/BillInvoiceCreateFormTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Create Bill Invoice - ${siteTitle}`
};

export default function BillInvoiceCreate() {
	return <BillInvoiceCreateFormTemplateView />;
}
