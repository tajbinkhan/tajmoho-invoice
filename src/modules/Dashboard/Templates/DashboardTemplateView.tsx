import { FaFileInvoice, FaStamp, FaUserSecret } from "react-icons/fa6";

const stats = [
	{
		id: 1,
		name: "Total Invoices",
		stat: "47",
		icon: FaFileInvoice
	},
	{
		id: 2,
		name: "Total Stickers",
		stat: "7",
		icon: FaStamp
	},
	{
		id: 3,
		name: "Total Clients",
		stat: "45",
		icon: FaUserSecret
	}
];

export default function DashboardTemplateView() {
	return (
		<div>
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
		</div>
	);
}
