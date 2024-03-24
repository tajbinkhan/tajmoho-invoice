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
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import useProfileUpdateForm from "@/modules/Profile/Hooks/useProfileUpdateForm";

export default function ProfileUpdateForm() {
	const { form, isFormSubmitting, onSubmit } = useProfileUpdateForm();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Update Profile Information</CardTitle>
				<CardDescription>Please update your profile information below.</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
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
