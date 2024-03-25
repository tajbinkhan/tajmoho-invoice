"use client";

import { errors } from "@/core/Errors";
import { successes } from "@/core/Successes";
import { route } from "@/routes/routes";
import { LoginSchema, LoginSchemaType } from "@/validators/Login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useLoginForm() {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;
	const searchParams = useSearchParams();
	const loginErrors = searchParams.get("error");
	const getCallbackUrl = searchParams.get("callbackUrl");
	const callbackUrl = getCallbackUrl ? getCallbackUrl : `${route.dashboardRoute.home}`;

	const getErrors = useCallback(() => {
		if (loginErrors) {
			if (loginErrors === "OAuthAccountNotLinked" || loginErrors === "EmailCreateAccount") {
				toast.error(errors.emailIsAlreadyAssociated);
			} else if (loginErrors === "OAuthSignin") {
				toast.error(errors.signInError);
			} else if (loginErrors === "OAuthCallback") {
				toast.error(errors.oauthProviderError);
			} else if (loginErrors === "OAuthCreateAccount") {
				toast.error(errors.accountCreationError);
			}
		} else {
			return null;
		}
	}, [loginErrors]);

	useEffect(() => {
		getErrors();
	}, [getErrors, loginErrors]);

	const onSubmit = async (data: LoginSchemaType) => {
		await axios
			.post(`${route.apiRoute.accountVerification}`, {
				email: data.email
			})
			.then(async response => {
				if (response.status === 200) {
					const details = await signIn("credentials", {
						redirect: false,
						email: data.email,
						password: data.password,
						callbackUrl
					});
					if (details?.error === "CredentialsSignin") {
						toast.error(errors.invalidUserCredentials);
						form.setValue("password", "");
					} else {
						toast.success(successes.signInSuccess);
						form.reset();
					}
				}
			})
			.catch(err => {
				try {
					if (err.response.status === 404) {
						toast.error(errors.userNotFound);
					} else {
						toast.error(errors.userIsNotVerified);
					}
				} catch (error) {
					toast.error(errors.signInError);
				}
			});
	};

	return {
		form,
		isFormSubmitting,
		onSubmit
	};
}
