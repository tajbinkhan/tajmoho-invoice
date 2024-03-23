import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export default function MobileMenu({
	navigation,
	sidebarOpen,
	handleSidebarOpen,
	pathName,
	homeRouteLink,
	mobileMenuImage,
}: MobileMenuProps) {
	return (
		<>
			{/* mobile menu */}
			<div className={cn(sidebarOpen ? "w-60" : "w-0", "fixed inset-0 z-[99] flex")}>
				<div
					className={`fixed inset-0 w-60 transform transition-transform duration-300 ease-in-out lg:hidden ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
						<button type="button" className="-m-2.5 p-2.5" onClick={handleSidebarOpen}>
							{sidebarOpen && (
								<>
									<span className="sr-only">Close sidebar</span>
									<AiOutlineClose
										className="h-6 w-6 text-white"
										aria-hidden="false"
									/>
								</>
							)}
						</button>
					</div>

					<div className="flex h-screen w-60 grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
						<div className="flex h-16 shrink-0 items-center">
							<Link href={homeRouteLink}>{mobileMenuImage}</Link>
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
													onClick={handleSidebarOpen}
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
			</div>
		</>
	);
}
