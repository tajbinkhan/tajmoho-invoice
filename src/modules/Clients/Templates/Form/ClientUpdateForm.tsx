"use client";

import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import useClientUpdate from "@/modules/Clients/Hooks/useClientUpdate";

interface Props {
	id: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
}

export default function ClientUpdateForm({ id, open, setOpen, refresh }: Props) {
	const { form, isLoading, isFormSubmitting, onSubmit } = useClientUpdate(id, setOpen, refresh);

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="30vh" />}>
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
							text="Update Client"
							loadingText="Updating Client..."
						/>
					</DialogFooter>
				</form>
			</Form>
		</LoadingBoundary>
	);
}
