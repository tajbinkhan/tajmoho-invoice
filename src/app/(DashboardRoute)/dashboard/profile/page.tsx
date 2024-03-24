import { siteTitle } from "@/core/Helpers";
import ProfileTemplateView from "@/modules/Profile/Templates/ProfileTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Profile - ${siteTitle}`
};

export default function DashboardProfile() {
	return <ProfileTemplateView />;
}
