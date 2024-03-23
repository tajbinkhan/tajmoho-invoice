interface MandatoryProps {
	homeRouteLink: string;
}

interface UserNavigationItem {
	name: string;
	href: string;
	icon: React.ComponentType<any>;
	separator: boolean;
}

interface NavigationGroup {
	group: boolean;
	groupItems: UserNavigationItem[];
}

interface ProfileMenuDropdownProps {
	userNavigationMenu: NavigationGroup[];
	pathName: string;
	handleLogout: () => void;
	userDisplayName: string;
	userEmail: string;
	topBarImage: JSX.Element;
}

interface TopBarProps extends ProfileMenuDropdownProps {
	sidebarOpen: boolean;
	handleSidebarOpen: () => void;
}

interface NavigationItem {
	name: string;
	href: string;
	icon: React.ComponentType<any>;
}

interface MobileMenuProps extends MandatoryProps {
	navigation: NavigationItem[];
	sidebarOpen: boolean;
	handleSidebarOpen: () => void;
	pathName: string;
	mobileMenuImage: JSX.Element;
}

interface SidebarMenuProps extends MandatoryProps {
	navigation: NavigationItem[];
	pathName: string;
	sidebarImage: JSX.Element;
}

interface RedirectLinkProps {
	dashboardRouteLink?: string;
}
