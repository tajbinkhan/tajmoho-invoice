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
import { numberWithCommas } from "@/core/Helpers";
import { BillInvoiceTableData } from "@/modules/BillInvoice/Templates/Table/BillInvoiceTableData";
import { route } from "@/routes/routes";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
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

interface BillInvoiceProducts {
	id: string;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

interface BillInvoiceData {
	id: string;
	invoiceNumber: string;
	invoiceDate: Date;
	currency: string;
	totalAmount: number;
	termsAndConditions: string;
	client: Client;
	products: BillInvoiceProducts[];
	createdAt: Date;
	updatedAt: Date;
}

interface Props {
	data: BillInvoiceData[];
	refresh: () => void;
}

export default function BillInvoiceColumnData({ data, refresh }: Props) {
	const handleDelete = async (id: string) => {
		await axios
			.delete(`${route.apiRoute.billInvoice}/${id}`)
			.then(() => {
				refresh();
				toast.success("Bill invoice deleted successfully");
			})
			.catch(() => {
				refresh();
				toast.error("Failed to delete bill invoice. Please try again.");
			});
	};

	const columns: ColumnDef<BillInvoiceData>[] = [
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
			accessorKey: "products",
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
						{data.products.map((product, index) => (
							<Button key={index} variant={"outline"} className="w-fit">
								{product.productName} (Qty = {product.quantity}), Price ={" "}
								{product.unitPrice} {data.currency}
							</Button>
						))}
					</div>
				);
			}
		},
		{
			accessorKey: "totalAmount",
			header: ({ column }) => {
				return (
					<Button
						variant="sorting"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="text-left"
					>
						Total Amount
						<LuArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const data = row.original;
				return `${data.currency} ${numberWithCommas(data.totalAmount)}`;
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
					<div className="flex gap-2">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={"default"}
										size={"sm"}
										className="h-auto p-2"
										asChild
									>
										<Link
											href={route.dashboardRoute.billInvoiceUpdate(data.id)}
										>
											<BiSolidEdit />
										</Link>
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

	return <BillInvoiceTableData data={data} columns={columns} />;
}
