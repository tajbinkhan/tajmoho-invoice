import { siteTitle } from "@/core/Helpers";
import DocumentDetailsTemplateView from "@/modules/DocumentDetails/Templates/DocumentDetailsTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Document Details - ${siteTitle}`
};

export default function DocumentDetails() {
	return <DocumentDetailsTemplateView />;
}
