"use client";

import InternalServerError from "@/layouts/AdminDashboard/Errors/500";

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <InternalServerError error={error} reset={reset} />;
}
