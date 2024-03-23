import RedirectIfAuthenticatedProvider from "@/providers/RedirectIfAuthenticatedProvider";

export default function PrivateLayout({ children }: Readonly<GlobalLayoutInterface>) {
	return <RedirectIfAuthenticatedProvider>{children}</RedirectIfAuthenticatedProvider>;
}
