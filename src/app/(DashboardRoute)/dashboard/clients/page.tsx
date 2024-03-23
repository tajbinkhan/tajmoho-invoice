import ClientsPageView from "@/components/templates/Dashboard/Clients/ClientsPageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Clients - ${siteTitle}`
};

export default function DashboardClient() {
	return <ClientsPageView />;
}
