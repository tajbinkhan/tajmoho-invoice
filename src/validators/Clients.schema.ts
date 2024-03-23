import { messages } from "@/core/Messages";
import { z } from "zod";

export const ClientsSchema = z.object({
	clientName: z.string().min(1, { message: messages.clientNameIsRequired }),
	officeAddress: z.string().min(1, { message: messages.officeAddressIsRequired })
});

export type ClientsSchemaType = z.infer<typeof ClientsSchema>;
