import PasswordVisibilityToggle from "@/components/common/PasswordVisibilityToggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import useProfilePasswordUpdateForm from "@/modules/Profile/Hooks/useProfilePasswordUpdateForm";

export default function ProfilePasswordChangeForm() {
	const { form, isFormSubmitting, onSubmit } = useProfilePasswordUpdateForm();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Update Current User Password</CardTitle>
				<CardDescription>Please update your current user password below.</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="space-y-5">
						<FormField
							control={form.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Old Password</FormLabel>
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
									<FormLabel>Confirm New Password</FormLabel>
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
					</CardContent>
					<CardFooter className="flex justify-end">
						<LoadingButton
							text="Update Profile"
							loadingText="Please wait..."
							isLoading={isFormSubmitting}
						/>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
