import {
	validateConfirmPassword,
	validateNewPassword,
	validatePassword,
} from "@/validators/CommonRules";
import { z } from "zod";

export const PasswordChangeSchema = z.object({
	oldPassword: validatePassword,
	newPassword: validateNewPassword,
	confirmPassword: validateConfirmPassword,
});

export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>;
