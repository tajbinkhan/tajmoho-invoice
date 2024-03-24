import { route } from "@/routes/routes";
import {
	PasswordResetTokenForm,
	PasswordResetTokenFormType
} from "@/validators/PasswordResetTokenForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function usePasswordResetTokenForm(token: string, tokenType: string) {
	const router = useRouter();

	const form = useForm<PasswordResetTokenFormType>({
		resolver: zodResolver(PasswordResetTokenForm),
		defaultValues: {
			newPassword: "",
			confirmPassword: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: PasswordResetTokenFormType) => {
		const dataToSend = {
			password: data.newPassword,
			token: token,
			tokenType: tokenType
		};
		try {
			await axios
				.post(`${route.apiRoute.passwordResetDone}`, dataToSend)
				.then(res => {
					form.reset();
					router.push(`${route.public.login}`);
					toast.success(res.data.message);
				})
				.catch(err => {
					try {
						if (err.response.statusText) {
							toast.error(err.response.statusText);
						} else {
							toast.error("Error occurred, please try again later");
						}
					} catch (error) {
						toast.error("Error occurred, please try again later");
					}
				});
		} catch (error: any) {
			toast.error("Error occurred, please try again later");
		}
	};

	return {
		form,
		onSubmit,
		isFormSubmitting
	};
}
