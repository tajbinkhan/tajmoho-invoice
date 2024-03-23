import ProfilePageView from "@/components/templates/Dashboard/ProfilePageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Profile - ${siteTitle}`
};

export default function DashboardProfile() {
	return <ProfilePageView />;
}
