"use client";

import PasswordVisibilityToggle from "@/components/common/PasswordVisibilityToggle";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { usePasswordResetTokenForm } from "@/modules/Authentication/Hooks/usePasswordResetTokenForm";
import { FormHeading } from "@/modules/Authentication/Templates/FromHeader/FormHeading";

export default function PasswordResetTokenTemplateView({
	token,
	tokenType
}: {
	token: string;
	tokenType: string;
}) {
	const { form, isFormSubmitting, onSubmit } = usePasswordResetTokenForm(token, tokenType);
	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<FormHeading className={`my-4 text-center`} title={"Account Password Reset"} />

			<div className="bg-white p-6 shadow sm:rounded-lg">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<PasswordVisibilityToggle
											{...field}
											placeholder="**********"
											disabled={isFormSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<PasswordVisibilityToggle
											{...field}
											placeholder="**********"
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
