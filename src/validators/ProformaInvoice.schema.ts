import { messages } from "@/core/Messages";
import {
	validateQuantity,
	validateServerTotalAmount,
	validateTotalAmount,
	validateUnitPrice
} from "@/validators/CommonRules";
import { z } from "zod";

const productsArray = z.array(
	z.object({
		productName: z.string().min(1, { message: messages.productNameIsRequired }),
		quantity: validateQuantity,
		unit: z.string().min(1, { message: messages.unitIsRequired }),
		unitPrice: validateUnitPrice
	})
);

export const ProformaInvoiceSchema = z.object({
	invoiceNumber: z.string().min(1, { message: messages.invoiceNumberIsRequired }),
	invoiceDate: z.date().min(new Date(), { message: messages.invoiceDateIsRequired }),
	client: z.string({
		required_error: messages.clientIsRequired
	}),
	currency: z.string().min(1, { message: messages.currencyIsRequired }),
	products: productsArray,
	customTotalAmount: z.boolean(),
	customTermsAndConditions: z.boolean(),
	totalAmount: validateTotalAmount,
	termsAndConditions: z.string().min(1, { message: messages.termsAndConditionsIsRequired })
});

export const ProformaInvoiceServerSchema = ProformaInvoiceSchema.omit({
	client: true,
	totalAmount: true,
	products: true
}).extend({
	totalAmount: validateServerTotalAmount,
	products: productsArray,
	clientId: z.string().min(1, { message: messages.clientIsRequired })
});

export type ProformaInvoiceSchemaType = z.infer<typeof ProformaInvoiceSchema>;

export type ProformaInvoiceServerSchemaType = z.infer<typeof ProformaInvoiceServerSchema>;
