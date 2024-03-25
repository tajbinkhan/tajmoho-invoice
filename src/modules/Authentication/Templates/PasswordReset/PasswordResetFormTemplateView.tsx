"use client";

import { Button } from "@/components/ui/button";
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
import { callbackUrlFn } from "@/core/Helpers";
import usePasswordResetForm from "@/modules/Authentication/Hooks/usePasswordResetForm";
import { FormHeading } from "@/modules/Authentication/Templates/FromHeader/FormHeading";
import { route } from "@/routes/routes";
import Link from "next/link";

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
							text="Reset Password"
							loadingText="Please wait..."
							className="w-full"
							isLoading={isFormSubmitting}
						/>
					</form>
				</Form>

				<div className="mt-8 text-center">
					<p className="text-sm text-gray-600">
						Remembered your password?{" "}
						<Button asChild variant={"link"} className="p-0">
							<Link href={callbackUrlFn(route.public.login)}>Login</Link>
						</Button>
					</p>
				</div>
			</div>
		</div>
	);
}
