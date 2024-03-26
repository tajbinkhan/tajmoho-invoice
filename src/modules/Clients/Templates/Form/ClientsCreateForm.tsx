"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import useClientsCreate from "@/modules/Clients/Hooks/useClientsCreate";
import { useState } from "react";

export default function ClientsCreateForm({ refresh }: { refresh: () => void }) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Client</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Enter Client Details</DialogTitle>
					<DialogDescription>
						It will show in the &quot;Proforma Invoice&quot; and &quot;Bill
						Invoice&quot;.
					</DialogDescription>
				</DialogHeader>
				<ClientForm open={open} setOpen={setOpen} refresh={refresh} />
			</DialogContent>
		</Dialog>
	);
}

export const ClientForm = ({
	open,
	setOpen,
	refresh
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
}) => {
	const { form, isFormSubmitting, onSubmit } = useClientsCreate(open, setOpen, refresh);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="clientName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Client Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter you client name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="officeAddress"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Office Address</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter you client address" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<LoadingButton
						isLoading={isFormSubmitting}
						text="Create Client"
						loadingText="Creating Client..."
					/>
				</DialogFooter>
			</form>
		</Form>
	);
};
