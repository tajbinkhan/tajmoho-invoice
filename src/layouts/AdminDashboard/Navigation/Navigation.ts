import { route } from "@/routes/routes";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaFileInvoice, FaFileInvoiceDollar, FaUserSecret } from "react-icons/fa6";
import { HiClipboardDocumentList, HiHome } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";

export const navigationMenu: NavigationItem[] = [
	{ name: "Dashboard", href: route.dashboardRoute.home, icon: HiHome },
	{ name: "Proforma Invoice", href: route.dashboardRoute.proformaInvoice, icon: FaFileInvoice },
	{ name: "Bill Invoice", href: route.dashboardRoute.billInvoice, icon: FaFileInvoiceDollar },
	{ name: "Clients", href: route.dashboardRoute.clients, icon: FaUserSecret },
	{
		name: "Document Details",
		href: route.dashboardRoute.documentDetails,
		icon: HiClipboardDocumentList
	}
];

export const userNavigationMenu: NavigationGroup[] = [
	{
		group: true,
		groupItems: [
			{
				name: "Profile",
				href: route.dashboardRoute.profile,
				icon: LuUser,
				separator: false
			},
			{
				name: "Settings",
				href: route.dashboardRoute.settings,
				icon: AiTwotoneSetting,
				separator: false
			}
		]
	}
];
