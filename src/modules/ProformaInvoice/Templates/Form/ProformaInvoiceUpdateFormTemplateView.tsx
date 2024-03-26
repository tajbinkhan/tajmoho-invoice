"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import { Separator } from "@/components/ui/separator";
import { ClientForm } from "@/modules/Clients/Templates/Form/ClientsCreateForm";
import useProformaInvoiceUpdateForm from "@/modules/ProformaInvoice/Hooks/useProformaInvoiceUpdateForm";
import ProformaInvoiceForm from "@/modules/ProformaInvoice/Templates/Form/ProformaInvoiceForm";

export default function ProformaInvoiceUpdateFormTemplateView({ id }: { id: string }) {
	const {
		form,
		openClientForm,
		setOpenClientForm,
		clientsOptions,
		currencyOptions,
		unitOptions,
		customTotalAmount,
		customTermsAndConditions,
		isFormSubmitting,
		onSubmit,
		fields,
		append,
		remove,
		clientsIsLoading,
		clientsRefresh,
		documentIsLoading,
		proformaInvoiceIsLoading
	} = useProformaInvoiceUpdateForm(id);

	return (
		<LoadingBoundary
			isLoading={proformaInvoiceIsLoading}
			fallback={<Loader height="calc(-144px + 100vh)" />}
		>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">
						Update Proforma Invoice #{form.getValues("invoiceNumber")}
					</h3>
					<p className="text-sm text-muted-foreground">
						Please fill in the form below to update the proforma invoice.
					</p>
				</div>
				<Separator />
				<Dialog open={openClientForm} onOpenChange={setOpenClientForm}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Enter Client Details</DialogTitle>
							<DialogDescription>
								It will show in the &quot;Proforma Invoice&quot; and &quot;Bill
								Invoice&quot;.
							</DialogDescription>
						</DialogHeader>
						<ClientForm
							open={openClientForm}
							setOpen={setOpenClientForm}
							refresh={clientsRefresh}
						/>
					</DialogContent>
				</Dialog>
				<ProformaInvoiceForm
					form={form}
					onSubmit={onSubmit}
					customTotalAmount={customTotalAmount}
					customTermsAndConditions={customTermsAndConditions}
					fields={fields}
					append={append}
					remove={remove}
					clientsOptions={clientsOptions}
					currencyOptions={currencyOptions}
					unitOptions={unitOptions}
					clientsIsLoading={clientsIsLoading}
					documentIsLoading={documentIsLoading}
					isFormSubmitting={isFormSubmitting}
					clientsRefresh={clientsRefresh}
					setOpenClientForm={setOpenClientForm}
					text="Update Proforma Invoice"
					loadingText="Updating Proforma Invoice..."
				/>
			</div>
		</LoadingBoundary>
	);
}
