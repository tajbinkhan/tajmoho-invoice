"use client";

import { callbackUrlFn } from "@/core/Helpers";
import { route } from "@/routes/routes";
import { PasswordResetSchema, PasswordResetSchemaType } from "@/validators/PasswordReset.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function usePasswordResetForm() {
	const form = useForm<PasswordResetSchemaType>({
		resolver: zodResolver(PasswordResetSchema),
		defaultValues: {
			email: ""
		}
	});

	const router = useRouter();
	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: PasswordResetSchemaType) => {
		try {
			await axios
				.post(`${route.apiRoute.passwordReset}`, data)
				.then(res => {
					toast.success(res.data.message);
					router.push(callbackUrlFn(route.public.login));
				})
				.catch(err => {
					try {
						if (err.response.data.error) {
							toast.error(err.response.data.error);
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
		isFormSubmitting,
		onSubmit
	};
}
