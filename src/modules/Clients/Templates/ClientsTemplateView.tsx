"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import useCustomSWR from "@/hooks/useCustomSWR";
import ClientUpdateForm from "@/modules/Clients/Templates/Form/ClientUpdateForm";
import ClientsCreateForm from "@/modules/Clients/Templates/Form/ClientsCreateForm";
import ClientsColumnData from "@/modules/Clients/Templates/Table/ClientsColumnData";
import { route } from "@/routes/routes";
import { useState } from "react";

export default function ClientsTemplateView() {
	const [id, setId] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const { data, isLoading, refresh } = useCustomSWR(route.apiRoute.clients);

	const handleUpdate = (id: string) => {
		setId(id);
		setOpen(true);
	};

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="calc(-144px + 100vh)" />}>
			{/* Update Form */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update Client Details</DialogTitle>
						<DialogDescription>
							It will show in the &quot;Proforma Invoice&quot; and &quot;Bill
							Invoice&quot;.
						</DialogDescription>
					</DialogHeader>
					<ClientUpdateForm id={id} open={open} setOpen={setOpen} refresh={refresh} />
				</DialogContent>
			</Dialog>

			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-base font-semibold leading-6 text-gray-900">
							Clients List
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							Here you can view the list of clients.
						</p>
					</div>
					<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
						{/* Create Form */}
						<ClientsCreateForm refresh={refresh} />
					</div>
				</div>
				<div className="mt-8 flow-root">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							{data?.data && (
								<ClientsColumnData
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
