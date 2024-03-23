"use client";

import Loader from "@/components/ui/loader";
import useAuth from "@/modules/Authentication/Hooks/useAuth";
import { redirect, useSearchParams } from "next/navigation";

interface RedirectIfAuthenticatedProviderInterface extends GlobalLayoutInterface {
	redirectUrl?: string;
}

export default function RedirectIfAuthenticatedProvider({
	children,
	redirectUrl = "/dashboard"
}: Readonly<RedirectIfAuthenticatedProviderInterface>) {
	const { loading, authenticated, unauthenticated } = useAuth();

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	if (loading) {
		return <Loader />;
	} else if (unauthenticated) {
		return children;
	} else if (authenticated) {
		callbackUrl ? redirect(callbackUrl) : redirect(redirectUrl);
	}
}
