import { messages } from "@/core/Messages";
import { z } from "zod";

export const ProfileSchema = z.object({
	name: z.string().min(1, { message: messages.nameIsRequired })
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
