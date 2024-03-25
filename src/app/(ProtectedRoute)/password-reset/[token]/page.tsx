import { siteTitle } from "@/core/Helpers";
import PasswordResetTokenTemplateView from "@/modules/Authentication/Templates/PasswordReset/PasswordResetTokenTemplateView";
import { TokenType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Password Reset - ${siteTitle}`
};

export default function PasswordResetToken({ params }: { params: { token: string } }) {
	const { token } = params;
	const tokenType = TokenType.PASSWORD_RESET_TOKEN;
	return <PasswordResetTokenTemplateView token={token} tokenType={tokenType} />;
}
