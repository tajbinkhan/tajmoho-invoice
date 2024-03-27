import { messages } from "@/core/Messages";
import {
	validateClient,
	validateCurrency,
	validateQuantity,
	validateServerClient,
	validateServerCurrency,
	validateServerTotalAmount,
	validateServerUnit,
	validateTotalAmount,
	validateUnit,
	validateUnitPrice
} from "@/validators/CommonRules";
import { z } from "zod";

const productsArray = z.array(
	z.object({
		colorName: z.string().min(1, { message: messages.colorNameIsRequired }),
		colorCount: z.string().min(1, { message: messages.colorCountIsRequired }),
		quantity: validateQuantity,
		unit: validateUnit,
		unitPrice: validateUnitPrice
	})
);

const productsArrayServer = z.array(
	z.object({
		colorName: z.string().min(1, { message: messages.colorNameIsRequired }),
		colorCount: z.string().min(1, { message: messages.colorCountIsRequired }),
		quantity: z.number().min(1, { message: messages.quantityIsRequired }),
		unit: validateServerUnit,
		unitPrice: z.number().min(1, { message: messages.priceIsRequired })
	})
);

export const BillInvoiceSchema = z.object({
	invoiceNumber: z
		.string({
			required_error: messages.invoiceNumberIsRequired
		})
		.min(1, { message: messages.invoiceNumberIsRequired }),
	invoiceDate: z.date({
		required_error: messages.invoiceDateIsRequired
	}),
	client: validateClient,
	currency: validateCurrency,
	description: z.string().min(1, { message: messages.descriptionIsRequired }),
	products: productsArray.min(1, { message: messages.minProducts }),
	customTotalAmount: z.boolean(),
	customTermsAndConditions: z.boolean(),
	totalAmount: validateTotalAmount,
	termsAndConditions: z
		.string({
			required_error: messages.termsAndConditionsIsRequired
		})
		.min(1, { message: messages.termsAndConditionsIsRequired })
});

export const BillInvoiceServerSchema = BillInvoiceSchema.omit({
	client: true,
	totalAmount: true,
	products: true,
	currency: true
}).extend({
	totalAmount: validateServerTotalAmount,
	products: productsArrayServer.min(1, { message: messages.minProducts }),
	clientId: validateServerClient,
	currency: validateServerCurrency
});

export type BillInvoiceSchemaType = z.infer<typeof BillInvoiceSchema>;
export type BillInvoiceServerSchemaType = z.infer<typeof BillInvoiceServerSchema>;
