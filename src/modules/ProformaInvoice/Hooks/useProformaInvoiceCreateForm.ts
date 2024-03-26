"use client";

import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import {
	ProformaInvoiceSchema,
	ProformaInvoiceSchemaType
} from "@/validators/ProformaInvoice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useProformaInvoiceCreateForm() {
	const [openClientForm, setOpenClientForm] = useState(false);

	const router = useRouter();

	const form = useForm<ProformaInvoiceSchemaType>({
		resolver: zodResolver(ProformaInvoiceSchema),
		defaultValues: {
			invoiceNumber: "",
			invoiceDate: new Date(),
			client: null,
			currency: null,
			products: [
				{
					productName: "",
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

	const onSubmit = async (data: ProformaInvoiceSchemaType) => {
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
			.post(route.apiRoute.proformaInvoice, modifiedData)
			.then(() => {
				form.reset();
				router.push(route.dashboardRoute.proformaInvoice);
				toast.success("Proforma Invoice created successfully");
			})
			.catch(err => {
				if (err.response.status === 403) {
					toast.error(err.response.data.message);
					return;
				}
				toast.error("Failed to create Proforma Invoice");
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
		documentIsLoading
	};
}
