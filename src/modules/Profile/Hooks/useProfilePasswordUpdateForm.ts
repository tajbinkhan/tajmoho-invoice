import useAuth from "@/modules/Authentication/Hooks/useAuth";
import { route } from "@/routes/routes";
import { PasswordChangeSchema, PasswordChangeSchemaType } from "@/validators/PasswordChange.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useProfilePasswordUpdateForm() {
	const { user } = useAuth();
	const form = useForm<PasswordChangeSchemaType>({
		resolver: zodResolver(PasswordChangeSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: ""
		}
	});

	const apiUrl = route.apiRoute.passwordChange;

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: PasswordChangeSchemaType) => {
		await axios
			.put(apiUrl, data)
			.then(() => {
				form.reset();
				toast.success("Password updated successfully");
			})
			.catch(err => {
				if (err.response.status === 401) {
					toast.error(err.response.data.message);
					return;
				} else if (err.response.status === 403) {
					toast.error(err.response.data.message);
					return;
				}
				toast.error("An error occurred while updating your password");
			});
	};

	return { form, isFormSubmitting, onSubmit };
}
