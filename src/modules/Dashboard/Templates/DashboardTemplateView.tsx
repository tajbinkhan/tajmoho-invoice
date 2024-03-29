"use client";

import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import { useEffect, useState } from "react";
import { FaFileInvoice, FaStamp, FaUserSecret } from "react-icons/fa6";

interface Stats {
	id: number;
	name: string;
	stat: string;
	icon: any;
}

const initialStats: Stats[] = [
	{
		id: 1,
		name: "Total Invoices",
		stat: "0",
		icon: FaFileInvoice
	},
	{
		id: 3,
		name: "Total Clients",
		stat: "0",
		icon: FaUserSecret
	},
	{
		id: 2,
		name: "Total Stickers",
		stat: "0",
		icon: FaStamp
	}
];

export default function DashboardTemplateView() {
	const [stats, setStats] = useState<Stats[]>(initialStats);
	const { data, isLoading } = useCustomSWR(route.apiRoute.stats);

	useEffect(() => {
		if (data?.data) {
			const countData = data.data as number[];
			const newStats = [
				{
					...initialStats[0],
					stat: (countData[0] + countData[1]).toString()
				},
				{
					...initialStats[1],
					stat: countData[2].toString()
				},
				{
					...initialStats[2]
				}
			];

			setStats(newStats);
		}
	}, [data]);

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="calc(-144px + 100vh)" />}>
			<h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{stats.map(item => (
					<div
						key={item.id}
						className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
					>
						<dt>
							<div className="absolute rounded-md bg-indigo-500 p-3">
								<item.icon className="h-6 w-6 text-white" aria-hidden="true" />
							</div>
							<p className="ml-16 truncate text-sm font-medium text-gray-500">
								{item.name}
							</p>
						</dt>
						<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
							<p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
							<div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
								<div className="text-sm">
									<a
										href="#"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										View all<span className="sr-only"> {item.name} stats</span>
									</a>
								</div>
							</div>
						</dd>
					</div>
				))}
			</dl>
		</LoadingBoundary>
	);
}
