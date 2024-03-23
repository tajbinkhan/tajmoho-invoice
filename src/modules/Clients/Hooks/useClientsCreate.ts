import { route } from "@/routes/routes";
import { ClientsSchema, ClientsSchemaType } from "@/validators/Clients.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useClientsCreate(
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	refresh: () => void
) {
	const form = useForm<ClientsSchemaType>({
		resolver: zodResolver(ClientsSchema),
		defaultValues: {
			clientName: "",
			officeAddress: ""
		}
	});

	useEffect(() => {
		if (open) {
			form.reset();
		}
	}, [form, open]);

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: ClientsSchemaType) => {
		await axios
			.post(route.apiRoute.clients, data)
			.then(res => {
				toast.success("Client created successfully");
				refresh();
				form.reset();
				setOpen(false);
			})
			.catch(err => {
				toast.error("Failed to create client");
			});
	};

	return {
		form,
		isFormSubmitting,
		onSubmit
	};
}
