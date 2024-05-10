"use client";

import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import { BillInvoiceSchema, BillInvoiceSchemaType } from "@/validators/BillInvoice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useBillInvoiceUpdateForm(id: string) {
	const [openClientForm, setOpenClientForm] = useState(false);

	const apiUrl = route.apiRoute.billInvoiceUpdate(id);

	const router = useRouter();

	const form = useForm<BillInvoiceSchemaType>({
		resolver: zodResolver(BillInvoiceSchema),
		defaultValues: {
			billNumber: "",
			billDate: new Date(),
			client: null,
			currency: null,
			description: "",
			products: [
				{
					colorName: "",
					colorCount: "",
					quantity: "",
					unit: null,
					unitPrice: ""
				}
			],
			customTotalAmount: false,
			customTermsAndConditions: false,
			totalAmount: "",
			termsAndConditions: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const {
		data: billInvoiceData,
		isLoading: billInvoiceIsLoading,
		refresh: billInvoiceRefresh
	} = useCustomSWR(apiUrl);

	const {
		data: clients,
		isLoading: clientsIsLoading,
		refresh: clientsRefresh
	} = useCustomSWR(route.apiRoute.clients);

	const { data: documentData, isLoading: documentIsLoading } = useCustomSWR(
		route.apiRoute.documentDetails
	);

	const clientsOptions = clients?.data.map((client: any) => ({
		label: client.clientName,
		value: client.id
	}));

	const currencyOptions = [
		{ label: "USD", value: "USD" },
		{ label: "BDT", value: "BDT" }
	];

	const unitOptions = [
		{ label: "LBS", value: "LBS" },
		{ label: "KG", value: "KG" }
	];

	const customTotalAmount = form.watch("customTotalAmount");
	const customTermsAndConditions = form.watch("customTermsAndConditions");
	const products = form.watch("products");

	const totalAmount = products?.reduce((acc, product) => {
		const quantity = parseFloat(product.quantity as string);
		const unitPrice = parseFloat(product.unitPrice as string);
		return acc + quantity * unitPrice;
	}, 0);

	useEffect(() => {
		if (totalAmount && !customTotalAmount) {
			form.setValue("totalAmount", totalAmount);
		}
	}, [customTotalAmount, form, totalAmount]);

	useEffect(() => {
		if (documentData?.data) {
			form.setValue("termsAndConditions", documentData.data.termsAndConditions);
		}
	}, [documentData, form]);

	const { fields, append, remove } = useFieldArray({
		name: "products",
		control: form.control
	});

	useEffect(() => {
		if (billInvoiceData?.data) {
			const { client, ...rest } = billInvoiceData?.data;
			const modifiedData: BillInvoiceSchemaType = {
				...rest,
				billDate: new Date(rest.billDate),
				client: {
					label: client.clientName,
					value: client.id
				},
				currency: {
					label: billInvoiceData.data.currency,
					value: billInvoiceData.data.currency
				},
				products: billInvoiceData.data.products.map((product: any) => ({
					...product,
					unit: {
						label: product.unit,
						value: product.unit
					}
				}))
			};
			form.reset(modifiedData);
		}
	}, [billInvoiceData, form]);

	const onSubmit = async (data: BillInvoiceSchemaType) => {
		const { client, ...rest } = data;
		const modifiedData = {
			...rest,
			clientId: data.client!.value,
			currency: data.currency!.value,
			products: data.products.map(product => ({
				...product,
				quantity: parseFloat(product.quantity.toString()),
				unitPrice: parseFloat(product.unitPrice.toString()),
				unit: product.unit!.value
			}))
		};

		await axios
			.put(apiUrl, modifiedData)
			.then(() => {
				form.reset();
				billInvoiceRefresh();
				router.push(route.dashboardRoute.billInvoice);
				toast.success("Bill Invoice updated successfully");
			})
			.catch(err => {
				if (err.response.status === 403) {
					toast.error(err.response.data.message);
					return;
				}
				toast.error("Failed to update Bill Invoice");
			});
	};

	return {
		form,
		openClientForm,
		setOpenClientForm,
		clientsOptions,
		currencyOptions,
		unitOptions,
		customTotalAmount,
		customTermsAndConditions,
		isFormSubmitting,
		onSubmit,
		fields,
		append,
		remove,
		clientsIsLoading,
		clientsRefresh,
		documentIsLoading,
		billInvoiceIsLoading
	};
}
