import useAuth from "@/modules/Authentication/Hooks/useAuth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function useDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { user } = useAuth();

	const handleSidebarOpen = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const pathName = usePathname();

	const handleLogout = () => {
		signOut();
	};

	return {
		sidebarOpen,
		handleSidebarOpen,
		pathName,
		handleLogout,
		user
	};
}
