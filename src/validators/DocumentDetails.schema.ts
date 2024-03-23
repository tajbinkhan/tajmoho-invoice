import { messages } from "@/core/Messages";
import { z } from "zod";

export const DocumentDetailsSchema = z.object({
	beneficiaryDetails: z.string().min(1, { message: messages.beneficiaryDetailsIsRequired }),
	termsAndConditions: z.string().min(1, { message: messages.termsAndConditionsIsRequired })
});

export type DocumentDetailsSchemaType = z.infer<typeof DocumentDetailsSchema>;
