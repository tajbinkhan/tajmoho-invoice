import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SidebarMenu({
	navigation,
	pathName,
	homeRouteLink,
	sidebarImage,
}: SidebarMenuProps) {
	return (
		<>
			{/* sidebar menu */}
			<div className="hidden transition-transform duration-300 ease-in-out lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
					<div className="flex h-16 shrink-0 items-center">
						<Link href={homeRouteLink}>{sidebarImage}</Link>
					</div>

					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item) => (
										<li key={item.name}>
											<Link
												href={item.href}
												className={cn(
													item.href === pathName
														? "bg-gray-800 text-white"
														: "text-gray-400 hover:bg-gray-800 hover:text-white",
													"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
												)}
											>
												<item.icon
													className="h-6 w-6 shrink-0"
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
