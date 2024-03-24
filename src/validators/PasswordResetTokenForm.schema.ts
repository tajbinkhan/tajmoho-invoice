import { validateNewPassword } from "@/validators/CommonRules";
import { z } from "zod";

export const PasswordResetTokenForm = z.object({
	newPassword: validateNewPassword,
	confirmPassword: validateNewPassword
});

export type PasswordResetTokenFormType = z.infer<typeof PasswordResetTokenForm>;
