"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Fragment } from "react";
import { LuChevronDown, LuLogOut } from "react-icons/lu";

export default function ProfileMenuDropdown({
	userNavigationMenu,
	pathName,
	handleLogout,
	userDisplayName,
	userEmail,
	topBarImage,
}: ProfileMenuDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="-m-1.5 flex items-center p-1.5 outline-none">
					<span className="sr-only">Open user menu</span>
					<div className="h-8 w-8 overflow-hidden rounded-full bg-gray-50">
						{topBarImage}
					</div>
					<span className="ml-4 hidden text-sm font-semibold leading-6 text-gray-900 lg:flex lg:items-center">
						{userDisplayName || userEmail}
					</span>
					<LuChevronDown
						className="hidden h-5 w-5 text-gray-400 lg:block"
						aria-hidden="true"
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<p className="mb-2 ml-2">{`(${userEmail})`}</p>
				<DropdownMenuSeparator />

				{userNavigationMenu.map((item, index) => (
					<Fragment key={index}>
						{item.group &&
							item.groupItems.map((groupItem, index) => (
								<Fragment key={index}>
									<DropdownMenuGroup>
										<Link href={groupItem.href}>
											<DropdownMenuItem
												className={
													pathName === groupItem.href
														? "bg-whitish cursor-pointer"
														: "cursor-pointer"
												}
											>
												<groupItem.icon className="mr-2 h-4 w-4" />
												<span>{groupItem.name}</span>
											</DropdownMenuItem>
										</Link>
									</DropdownMenuGroup>
								</Fragment>
							))}
						{item.group && <DropdownMenuSeparator />}
					</Fragment>
				))}

				<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
					<LuLogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
