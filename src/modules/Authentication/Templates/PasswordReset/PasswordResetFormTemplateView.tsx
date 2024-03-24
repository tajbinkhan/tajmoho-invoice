"use client";

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
import usePasswordResetForm from "@/modules/Authentication/Hooks/usePasswordResetForm";
import { FormHeading } from "@/modules/Authentication/Templates/FromHeader/FormHeading";

export function PasswordResetFormTemplateView() {
	const { form, isFormSubmitting, onSubmit } = usePasswordResetForm();
	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<FormHeading className={`my-4 text-center`} title={"Account Password Reset"} />

			<div className="bg-white p-6 shadow sm:rounded-lg">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											placeholder="john.doe@example.com"
											{...field}
											disabled={isFormSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<LoadingButton
							text="Login"
							variant="default"
							variantLoading="loading"
							loadingText="Please wait..."
							className="w-full"
							isLoading={isFormSubmitting}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
}
