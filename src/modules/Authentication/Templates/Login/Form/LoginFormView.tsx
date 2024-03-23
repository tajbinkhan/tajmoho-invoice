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
import { useLoginForm } from "@/modules/Authentication/Hooks/useLoginForm";
import Link from "next/link";

export default function LoginFormView() {
	const { form, onSubmit } = useLoginForm();
	const formSubmitting = form.formState.isSubmitting;
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
									disabled={formSubmitting}
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
										disabled={formSubmitting}
									/>
									<div className="float-end">
										<Link
											href="/forgot-password"
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
					isLoading={formSubmitting}
				/>
			</form>
		</Form>
	);
}
