"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ClientsTableData } from "@/modules/Clients/Templates/Table/ClientsTableData";
import { route } from "@/routes/routes";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { BiSolidEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";
import { LuArrowUpDown } from "react-icons/lu";
import { toast } from "sonner";

interface ClientsData {
	id: string;
	clientName: string;
	officeAddress: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Props {
	data: ClientsData[];
	refresh: () => void;
	handleUpdate: (uid: string) => void;
}

export default function ClientsColumnData({ data, refresh, handleUpdate }: Props) {
	const handleDelete = async (id: string) => {
		await axios
			.delete(`${route.apiRoute.clients}/${id}`)
			.then(() => {
				refresh();
				toast.success("Client deleted successfully");
			})
			.catch(() => {
				refresh();
				toast.error("Failed to delete client. Please try again.");
			});
	};

	const columns: ColumnDef<ClientsData>[] = [
		{
			accessorKey: "clientName",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Client Name
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			}
		},
		{
			accessorKey: "officeAddress",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Office Address
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			}
		},
		{
			accessorKey: "updatedAt",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Updated
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const data = row.original;
				const formattedDate = format(data.updatedAt, "dd/MM/yyyy");
				return formattedDate;
			},
			sortingFn: row => {
				return new Date(row.original.updatedAt).getTime();
			}
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Created
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const data = row.original;
				const formattedDate = format(data.createdAt, "dd/MM/yyyy");
				return formattedDate;
			},
			sortingFn: row => {
				return new Date(row.original.createdAt).getTime();
			}
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const data = row.original;

				return (
					<div className="space-x-2">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={"default"}
										size={"sm"}
										className="h-auto p-2"
										onClick={() => handleUpdate(data.id)}
									>
										<BiSolidEdit />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Update Client</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<AlertDialog>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<AlertDialogTrigger asChild>
											<Button
												variant={"destructive"}
												size={"sm"}
												className="h-auto p-2"
											>
												<HiTrash />
											</Button>
										</AlertDialogTrigger>
									</TooltipTrigger>
									<TooltipContent>
										<p>Delete Client</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Are you sure, you want to delete &quot;{data.clientName}
										&quot;?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => handleDelete(data.id)}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				);
			}
		}
	];

	return <ClientsTableData data={data} columns={columns} />;
}
