import { validateEmail } from "@/validators/CommonRules";
import { z } from "zod";

export const PasswordResetSchema = z.object({
	email: validateEmail
});

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;
