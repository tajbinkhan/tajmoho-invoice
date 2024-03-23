import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function BadRequest({ dashboardRouteLink }: RedirectLinkProps) {
	return (
		<>
			<main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-indigo-600">400</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Bad Request
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						Sorry, we couldn’t load the page due to a bad request. Please try
						again with some changes or go back to the{" "}
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href={dashboardRouteLink || "/"} className={buttonVariants()}>
							Go back dashboard
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
