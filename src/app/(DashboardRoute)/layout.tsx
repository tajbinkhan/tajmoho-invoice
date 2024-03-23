import DashboardPageLayoutView from "@/layouts/AdminDashboard/Structure/LayoutPageView";
import RedirectIfNotAuthenticated from "@/providers/RedirectIfNotAuthenticatedProvider";
import { route } from "@/routes/routes";

export default function DashboardLayout({ children }: Readonly<GlobalLayoutInterface>) {
	return (
		<RedirectIfNotAuthenticated redirectUrl={route.public.login}>
			<DashboardPageLayoutView>{children}</DashboardPageLayoutView>
		</RedirectIfNotAuthenticated>
	);
}
