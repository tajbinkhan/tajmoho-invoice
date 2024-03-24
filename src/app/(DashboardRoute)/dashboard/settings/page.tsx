import { siteTitle } from "@/core/Helpers";
import SettingsTemplateView from "@/modules/Settings/Templates/SettingsTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Settings - ${siteTitle}`
};

export default function DashboardSetting() {
	return <SettingsTemplateView />;
}
