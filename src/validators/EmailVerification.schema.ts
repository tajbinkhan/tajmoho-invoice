import { validateEmail } from "@/validators/CommonRules";
import { z } from "zod";

export const EmailVerificationSchema = z.object({
	email: validateEmail,
});

export type EmailVerificationSchemaType = z.infer<typeof EmailVerificationSchema>;
