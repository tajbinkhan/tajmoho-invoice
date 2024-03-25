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
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { callbackUrlFn } from "@/core/Helpers";
import { useLoginForm } from "@/modules/Authentication/Hooks/useLoginForm";
import { route } from "@/routes/routes";
import Link from "next/link";

export default function LoginFormView() {
	const { form, isFormSubmitting, onSubmit } = useLoginForm();

	return (
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

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<>
									<PasswordVisibilityToggle
										{...field}
										placeholder="**********"
										disabled={isFormSubmitting}
									/>
									<div className="float-end">
										<Link
											href={callbackUrlFn(route.public.passwordReset)}
											className="text-sm text-blue-600"
										>
											Forgot password?
										</Link>
									</div>
								</>
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
	);
}
