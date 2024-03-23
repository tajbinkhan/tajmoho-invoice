import { messages } from "@/core/Messages";
import { validateEmail } from "@/validators/CommonRules";
import { z } from "zod";

export const LoginSchema = z.object({
	email: validateEmail,
	password: z.string().min(1, { message: messages.passwordRequired })
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
