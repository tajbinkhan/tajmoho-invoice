import { siteTitle } from "@/core/Helpers";
import { PasswordResetFormTemplateView } from "@/modules/Authentication/Templates/PasswordReset/PasswordResetFormTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Password Reset - ${siteTitle}`
};

export default function PasswordReset() {
	return <PasswordResetFormTemplateView />;
}
