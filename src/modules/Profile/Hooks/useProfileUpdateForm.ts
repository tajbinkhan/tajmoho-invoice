import useAuth from "@/modules/Authentication/Hooks/useAuth";
import { route } from "@/routes/routes";
import { ProfileSchema, ProfileSchemaType } from "@/validators/Profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useProfileUpdateForm() {
	const { user } = useAuth();
	const form = useForm<ProfileSchemaType>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: ""
		}
	});

	const apiUrl = route.apiRoute.profile + "/" + user?.id;

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name!
			});
		}
	}, [form, user]);

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: ProfileSchemaType) => {
		await axios
			.put(apiUrl, data)
			.then(() => {
				toast.success("Profile updated successfully");
			})
			.catch(() => {
				toast.error("An error occurred while updating your profile");
			});
	};

	return { form, isFormSubmitting, onSubmit };
}
