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
import { ProformaInvoiceTableData } from "@/modules/ProformaInvoice/Templates/Table/ProformaInvoiceTableData";
import { route } from "@/routes/routes";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { BiSolidEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";
import { LuArrowUpDown } from "react-icons/lu";
import { toast } from "sonner";

interface Client {
	id: string;
	clientName: string;
	officeAddress: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ProformaInvoiceProducts {
	id: string;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

interface ProformaInvoiceData {
	id: string;
	invoiceNumber: string;
	invoiceDate: Date;
	currency: string;
	totalAmount: number;
	termsAndConditions: string;
	client: Client;
	products: ProformaInvoiceProducts[];
	createdAt: Date;
	updatedAt: Date;
}

interface Props {
	data: ProformaInvoiceData[];
	refresh: () => void;
	handleUpdate: (uid: string) => void;
}

export default function ProformaInvoiceColumnData({ data, refresh, handleUpdate }: Props) {
	const handleDelete = async (id: string) => {
		await axios
			.delete(`${route.apiRoute.clients}/${id}`)
			.then(() => {
				refresh();
				toast.success("Proforma invoice deleted successfully");
			})
			.catch(() => {
				refresh();
				toast.error("Failed to delete proforma invoice. Please try again.");
			});
	};

	const columns: ColumnDef<ProformaInvoiceData>[] = [
		{
			accessorKey: "invoiceDate",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Invoice Date
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const data = row.original;
				const formattedDate = format(data.invoiceDate, "dd/MM/yyyy");
				return formattedDate;
			}
		},
		{
			accessorKey: "invoiceNumber",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Invoice Number
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			}
		},
		{
			accessorKey: "client",
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
			},
			cell: ({ row }) => {
				const data = row.original;
				return data.client.clientName;
			}
		},
		{
			accessorKey: "Products",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Products
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const data = row.original;
				return (
					<div className="flex flex-col gap-3">
						{data.products.map(product => (
							<Button key={product.id}>
								{product.productName} (Qty = {product.quantity}), Price ={" "}
								{product.unitPrice} {data.currency}
							</Button>
						))}
					</div>
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
										Are you sure, you want to delete &quot;{data.invoiceNumber}
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

	return <ProformaInvoiceTableData data={data} columns={columns} />;
}
