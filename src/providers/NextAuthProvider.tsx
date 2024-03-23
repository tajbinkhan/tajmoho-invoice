"use client";

import { Toaster } from "@/components/ui/sonner";
import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export const NextAuthProvider = ({ children }: GlobalLayoutInterface) => {
	const [dbSuccess, setDbSuccess] = useState<boolean>(true);

	const { data, error } = useCustomSWR(`${route.apiRoute.checkDBConnection}`);

	useEffect(() => {
		data?.success && setDbSuccess(true);
		error && setDbSuccess(false);
	}, [data, error]);
	return (
		<>
			{dbSuccess ? (
				<SessionProvider
					// Re-fetch session every 5 minutes
					refetchInterval={5 * 60}
					// Re-fetches session when window is focused
					refetchOnWindowFocus={true}
				>
					{children}
					<Toaster position="top-right" richColors closeButton />
				</SessionProvider>
			) : (
				<div className="flex min-h-screen items-center justify-center">
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-3xl font-bold text-gray-900">
							Database Connection Error
						</h1>
						<p className="text-gray-500">
							Please check your database connection and try again.
						</p>
					</div>
				</div>
			)}
		</>
	);
};
