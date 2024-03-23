import useCustomSWR from "@/hooks/useCustomSWR";
import { route } from "@/routes/routes";
import { ClientsSchema, ClientsSchemaType } from "@/validators/Clients.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useClientUpdate(
	id: string,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	refresh: () => void
) {
	const apiUrl = route.apiRoute.clients + `/${id}`;
	const { data, isLoading } = useCustomSWR(apiUrl);

	const form = useForm<ClientsSchemaType>({
		resolver: zodResolver(ClientsSchema),
		defaultValues: {
			clientName: "",
			officeAddress: ""
		}
	});

	useEffect(() => {
		if (!isLoading && data && data.data) {
			form.reset(data.data);
		}
	}, [data, form, isLoading]);

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: ClientsSchemaType) => {
		await axios
			.put(apiUrl, data)
			.then(res => {
				toast.success("Client updated successfully");
				refresh();
				form.reset();
				setOpen(false);
			})
			.catch(err => {
				toast.error("Failed to update client");
			});
	};

	return {
		form,
		isLoading,
		isFormSubmitting,
		onSubmit
	};
}
