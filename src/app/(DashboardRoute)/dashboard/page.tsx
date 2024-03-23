import DashboardPageView from "@/components/templates/Dashboard/DashboardPageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Dashboard - ${siteTitle}`
};

export default function Dashboard() {
	return <DashboardPageView />;
}
