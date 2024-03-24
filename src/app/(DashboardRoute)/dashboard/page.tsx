import { siteTitle } from "@/core/Helpers";
import DashboardTemplateView from "@/modules/Dashboard/Templates/DashboardTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Dashboard - ${siteTitle}`
};

export default function Dashboard() {
	return <DashboardTemplateView />;
}
