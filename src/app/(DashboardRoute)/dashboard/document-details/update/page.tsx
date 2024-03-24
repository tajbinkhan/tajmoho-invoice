import { siteTitle } from "@/core/Helpers";
import DocumentDetailsUpdateTemplateView from "@/modules/DocumentDetails/Templates/Update/DocumentDetailsUpdateTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Update Document Details - ${siteTitle}`
};

export default function DocumentDetailsUpdate() {
	return <DocumentDetailsUpdateTemplateView />;
}
