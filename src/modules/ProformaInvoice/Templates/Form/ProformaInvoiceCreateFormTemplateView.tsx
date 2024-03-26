"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ClientForm } from "@/modules/Clients/Templates/Form/ClientsCreateForm";
import useProformaInvoiceCreateForm from "@/modules/ProformaInvoice/Hooks/useProformaInvoiceCreateForm";
import ProformaInvoiceForm from "@/modules/ProformaInvoice/Templates/Form/ProformaInvoiceForm";

export default function ProformaInvoiceCreateFormTemplateView() {
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
		documentIsLoading
	} = useProformaInvoiceCreateForm();

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Create New Proforma Invoice</h3>
				<p className="text-sm text-muted-foreground">
					Please fill in the form below to create a new proforma invoice.
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
				text="Create Proforma Invoice"
				loadingText="Creating Proforma Invoice..."
			/>
		</div>
	);
}
