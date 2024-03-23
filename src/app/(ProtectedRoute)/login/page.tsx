import LoginPageView from "@/components/templates/Login/LoginPageView";
import { siteTitle } from "@/core/Helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Login - ${siteTitle}`
};

export default function Login() {
	return <LoginPageView />;
}
