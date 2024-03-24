import { siteTitle } from "@/core/Helpers";
import { LoginTemplateView } from "@/modules/Authentication/Templates/Login/LoginTemplateView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Login - ${siteTitle}`
};

export default function Login() {
	return <LoginTemplateView />;
}
