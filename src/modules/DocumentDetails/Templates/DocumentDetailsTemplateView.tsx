"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import { Separator } from "@/components/ui/separator";
import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import parse from "html-react-parser";
import Link from "next/link";

export default function DocumentDetailsTemplateView() {
	const { data, isLoading } = useCustomSWR(route.apiRoute.documentDetails);

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="calc(-144px + 100vh)" />}>
			<Card>
				<CardHeader>
					<CardTitle>Document Details</CardTitle>
					<CardDescription>Here you can view all the document details.</CardDescription>
					<Separator />
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<h2 className="text-xl font-semibold tracking-tight">
							Beneficiary Details
						</h2>
						<p className="leading-7">{data?.data?.beneficiaryDetails}</p>
					</div>
					<div className="flex flex-col gap-3">
						<h2 className="text-xl font-semibold tracking-tight">Terms & Conditions</h2>
						<div className="pl-4 leading-7" id="termsAndConditions">
							{data?.data && parse(data?.data?.termsAndConditions)}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button asChild>
						<Link href={route.dashboardRoute.documentDetailsUpdate}>
							Update Document Details
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</LoadingBoundary>
	);
}
