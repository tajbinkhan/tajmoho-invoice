import ProformaInvoiceUpdateFormTemplateView from "@/modules/ProformaInvoice/Templates/Form/ProformaInvoiceUpdateFormTemplateView";

export default function ProformaInvoiceUpdate({ params }: { params: { id: string } }) {
	return <ProformaInvoiceUpdateFormTemplateView id={params.id} />;
}
