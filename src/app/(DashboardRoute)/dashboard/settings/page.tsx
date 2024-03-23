import SettingsPageView from "@/components/templates/Dashboard/SettingsPageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Settings - ${siteTitle}`
};

export default function DashboardSetting() {
	return <SettingsPageView />;
}
