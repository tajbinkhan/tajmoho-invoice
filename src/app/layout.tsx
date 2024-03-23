import Loader from "@/components/ui/loader";
import { siteDescription, siteTitle } from "@/core/Helpers";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const fontSans = FontSans({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: "normal",
	preload: false,
	display: "swap",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: siteTitle,
	description: siteDescription
};

export default function RootLayout({ children }: Readonly<GlobalLayoutInterface>) {
	return (
		<html lang="en">
			<body className={fontSans.className} suppressHydrationWarning={true}>
				<NextAuthProvider>
					<Suspense fallback={<Loader />}>{children}</Suspense>
				</NextAuthProvider>
			</body>
		</html>
	);
}
