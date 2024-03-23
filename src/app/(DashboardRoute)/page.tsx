"use client";

import { route } from "@/routes/routes";
import { redirect, usePathname } from "next/navigation";

export default function RedirectIfAccessTheRoute() {
	const pathName = usePathname();

	if (pathName === route.public.home) {
		redirect(route.dashboardRoute.home);
	}
}
