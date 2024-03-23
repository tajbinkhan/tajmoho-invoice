"use client";

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

	const searchParams = useSearchParams();
	const loginErrors = searchParams.get("error");
	const getCallbackUrl = searchParams.get("callbackUrl");
	const callbackUrl = getCallbackUrl ? getCallbackUrl : `${route.dashboardRoute.home}`;

	const getErrors = useCallback(() => {
		if (loginErrors) {
			if (loginErrors === "OAuthAccountNotLinked" || loginErrors === "EmailCreateAccount") {
				toast.error("Email is already associated with an account");
			} else if (loginErrors === "OAuthSignin") {
				toast.error("Error signing in");
			} else if (loginErrors === "OAuthCallback") {
				toast.error("Error in handling the response from the OAuth provider");
			} else if (loginErrors === "OAuthCreateAccount") {
				toast.error("Error in creating the account");
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
						toast.error("Email or password is incorrect");
						// form.setValue("password", "");
					} else {
						toast.success("Signed in successfully");
						form.reset();
					}
				}
			})
			.catch(err => {
				try {
					if (err.response.status === 404) {
						toast.error("Account not found");
					} else {
						toast.error("Account is not verified");
					}
				} catch (error) {
					toast.error("Error signing in");
				}
			});
	};

	return {
		form,
		onSubmit
	};
}
