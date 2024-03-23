import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import {
	DocumentDetailsSchema,
	DocumentDetailsSchemaType
} from "@/validators/DocumentDetails.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useDocumentDetailsUpdate() {
	const form = useForm<DocumentDetailsSchemaType>({
		resolver: zodResolver(DocumentDetailsSchema),
		defaultValues: {
			beneficiaryDetails: "",
			termsAndConditions: ""
		}
	});

	const router = useRouter();

	const isFormSubmitting = form.formState.isSubmitting;
	const { data: documentDetailData, isLoading } = useCustomSWR(route.apiRoute.documentDetails);

	useEffect(() => {
		if (!isLoading) {
			form.reset(documentDetailData.data);
		}
	}, [documentDetailData, form, isLoading]);

	const postSubmission = async (data: DocumentDetailsSchemaType) => {
		await axios
			.post(route.apiRoute.documentDetails, data)
			.then(res => {
				toast.success("Document details create successfully");
				router.push(route.dashboardRoute.documentDetails);
			})
			.catch(err => {
				toast.error("Failed to create document details");
			});
	};

	const putSubmission = async (id: string, data: DocumentDetailsSchemaType) => {
		const apiUrl = `${route.apiRoute.documentDetails}/${id}`;
		await axios
			.put(apiUrl, data)
			.then(res => {
				toast.success("Document details updated successfully");
				router.push(route.dashboardRoute.documentDetails);
			})
			.catch(err => {
				toast.error("Failed to update document details");
			});
	};

	const onSubmit = async (data: DocumentDetailsSchemaType) => {
		if (documentDetailData.data.id) {
			await putSubmission(documentDetailData.data.id, data);
		} else {
			await postSubmission(data);
		}
	};

	return {
		form,
		isLoading,
		isFormSubmitting,
		onSubmit
	};
}
