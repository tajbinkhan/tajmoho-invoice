"use client";

import Loader from "@/components/ui/loader";
import { Env } from "@/core/Env";
import useAuth from "@/modules/Authentication/Hooks/useAuth";
import { redirect, usePathname } from "next/navigation";

interface RedirectIfNotAuthenticatedProviderInterface extends GlobalLayoutInterface {
	redirectUrl?: string;
}

export default function RedirectIfNotAuthenticatedProvider({
	children,
	redirectUrl = "/login"
}: Readonly<RedirectIfNotAuthenticatedProviderInterface>) {
	const { loading, authenticated, unauthenticated } = useAuth();

	const pathName = usePathname();

	const callbackUrl = encodeURIComponent(`${Env.NEXT_PUBLIC_FRONTEND_URL}${pathName}`);

	const loginRedirect = `${redirectUrl}?callbackUrl=${callbackUrl}`;

	if (loading) {
		return <Loader />;
	} else if (unauthenticated) {
		redirect(loginRedirect);
	} else if (authenticated) {
		return <>{children}</>;
	}
}
