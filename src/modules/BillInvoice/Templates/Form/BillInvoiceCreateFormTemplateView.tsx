"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useBillInvoiceCreateForm from "@/modules/BillInvoice/Hooks/useBillInvoiceCreateForm";
import BillInvoiceForm from "@/modules/BillInvoice/Templates/Form/BillInvoiceForm";
import { ClientForm } from "@/modules/Clients/Templates/Form/ClientsCreateForm";

export default function BillInvoiceCreateFormTemplateView() {
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
	} = useBillInvoiceCreateForm();

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Create New Bill Invoice</h3>
				<p className="text-sm text-muted-foreground">
					Please fill in the form below to create a new bill invoice.
				</p>
			</div>
			<Separator />
			<Dialog open={openClientForm} onOpenChange={setOpenClientForm}>
				<DialogContent
					onInteractOutside={e => {
						e.preventDefault();
					}}
					onOpenAutoFocus={e => {
						e.preventDefault();
					}}
				>
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
			<BillInvoiceForm
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
				text="Create Bill Invoice"
				loadingText="Creating Bill Invoice..."
			/>
		</div>
	);
}
