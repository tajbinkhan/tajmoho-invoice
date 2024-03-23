"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import useCustomSWR from "@/hooks/useCustomSWR";
import ProformaInvoiceColumnData from "@/modules/ProformaInvoice/Templates/Table/ProformaInvoiceColumnData";
import { route } from "@/routes/routes";
import Link from "next/link";
import { useState } from "react";

export default function ProformaInvoiceTemplateView() {
	const [id, setId] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const { data, isLoading, refresh } = useCustomSWR(route.apiRoute.proformaInvoice);

	const handleUpdate = (id: string) => {
		setId(id);
		setOpen(true);
	};

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="calc(-144px + 100vh)" />}>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-base font-semibold leading-6 text-gray-900">
							Proforma Invoices
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							List of all proforma invoices created
						</p>
					</div>
					<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
						<Button asChild>
							<Link href={route.dashboardRoute.proformaInvoiceCreate}>
								Create Proforma Invoice
							</Link>
						</Button>
					</div>
				</div>
				<div className="mt-8 flow-root">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							{data?.data && (
								<ProformaInvoiceColumnData
									data={data?.data}
									refresh={refresh}
									handleUpdate={handleUpdate}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</LoadingBoundary>
	);
}
