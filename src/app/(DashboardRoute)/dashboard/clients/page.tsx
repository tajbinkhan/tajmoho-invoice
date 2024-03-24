import { siteTitle } from "@/core/Helpers";
import ClientsTemplateView from "@/modules/Clients/Templates/ClientsTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Clients - ${siteTitle}`
};

export default function DashboardClient() {
	return <ClientsTemplateView />;
}
