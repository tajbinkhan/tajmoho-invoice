"use client";

import { siteTitle } from "@/core/Helpers";
import useDashboard from "@/layouts/AdminDashboard/Hooks/useDashboard";
import { navigationMenu, userNavigationMenu } from "@/layouts/AdminDashboard/Navigation/Navigation";
import MobileMenu from "@/layouts/AdminDashboard/Structure/Components/MobileMenu";
import SidebarMenu from "@/layouts/AdminDashboard/Structure/Components/SidebarMenu";
import TopBar from "@/layouts/AdminDashboard/Structure/Components/TopBar";
import { route } from "@/routes/routes";
import Image from "next/image";

const SidebarImage = () => (
	<Image
		className="size-10 w-auto"
		src="/images/logo-big.webp"
		alt={siteTitle}
		height={200}
		width={200}
		priority
	/>
);

const MobileMenuImage = () => (
	<Image
		className="size-10 w-auto"
		src="/images/logo-big.webp"
		alt={siteTitle}
		height={200}
		width={200}
		priority
	/>
);

const TopBarImage = () => (
	<Image
		height={200}
		width={200}
		src="/images/profile.png"
		alt="User profile"
		className="h-full w-full object-cover"
	/>
);

export default function DashboardPageLayoutView({ children }: GlobalLayoutInterface) {
	const { sidebarOpen, handleSidebarOpen, pathName, handleLogout, user } = useDashboard();
	const homeRouteLink = route.dashboardRoute.home;
	const userDisplayName = user?.name as string;
	const userEmail = user?.email as string;
	return (
		<>
			<div>
				{sidebarOpen && (
					<div
						className="fixed inset-0 z-[99] bg-gray-900/80"
						onClick={handleSidebarOpen}
					/>
				)}

				<MobileMenu
					navigation={navigationMenu}
					sidebarOpen={sidebarOpen}
					pathName={pathName}
					handleSidebarOpen={handleSidebarOpen}
					homeRouteLink={homeRouteLink}
					mobileMenuImage={<MobileMenuImage />}
				/>

				<SidebarMenu
					navigation={navigationMenu}
					pathName={pathName}
					homeRouteLink={homeRouteLink}
					sidebarImage={<SidebarImage />}
				/>

				<div className="lg:pl-72">
					<TopBar
						sidebarOpen={sidebarOpen}
						handleSidebarOpen={handleSidebarOpen}
						userNavigationMenu={userNavigationMenu}
						pathName={pathName}
						handleLogout={handleLogout}
						userDisplayName={userDisplayName}
						userEmail={userEmail}
						topBarImage={<TopBarImage />}
					/>

					<main className="py-10">
						<div className="px-4 sm:px-6 lg:px-8">{children}</div>
					</main>
				</div>
			</div>
		</>
	);
}
