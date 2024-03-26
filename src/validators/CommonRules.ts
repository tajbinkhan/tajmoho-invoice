import { messages } from "@/core/Messages";
import { z } from "zod";

export const validateEmail = z
	.string()
	.min(1, { message: messages.emailIsRequired })
	.email({ message: messages.invalidEmail });

export const validatePassword = z
	.string()
	.min(1, { message: messages.passwordRequired })
	.min(6, { message: messages.passwordLengthMin })
	.regex(new RegExp(".*[A-Z].*"), {
		message: messages.passwordOneUppercase
	})
	.regex(new RegExp(".*[a-z].*"), {
		message: messages.passwordOneLowercase
	})
	.regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric });

export const validateNewPassword = z
	.string()
	.min(1, { message: messages.passwordRequired })
	.min(6, { message: messages.passwordLengthMin })
	.regex(new RegExp(".*[A-Z].*"), {
		message: messages.passwordOneUppercase
	})
	.regex(new RegExp(".*[a-z].*"), {
		message: messages.passwordOneLowercase
	})
	.regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric });

export const validateConfirmPassword = z
	.string()
	.min(1, { message: messages.confirmPasswordRequired })
	.min(6, { message: messages.passwordLengthMin })
	.regex(new RegExp(".*[A-Z].*"), {
		message: messages.passwordOneUppercase
	})
	.regex(new RegExp(".*[a-z].*"), {
		message: messages.passwordOneLowercase
	})
	.regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric });

export const validateQuantity = z
	.string()
	.min(1, { message: messages.quantityIsRequired })
	.refine(
		value => {
			return !isNaN(Number(value));
		},
		{ message: messages.quantityMustBeNumber }
	)
	.or(z.number().min(1, { message: messages.quantityIsRequired }));

export const validateUnitPrice = z
	.string()
	.min(1, { message: messages.priceIsRequired })
	.refine(
		value => {
			return !isNaN(Number(value));
		},
		{ message: messages.priceMustBeNumber }
	)
	.or(z.number().min(1, { message: messages.priceIsRequired }));

export const validateTotalAmount = z
	.string()
	.min(1, { message: messages.totalAmountIsRequired })
	.refine(
		value => {
			return !isNaN(Number(value));
		},
		{ message: messages.totalAmountMustBeNumber }
	)
	.or(z.number().min(1, { message: messages.totalAmountIsRequired }));

export const validateUnit = z
	.object(
		{
			value: z.string().min(1, { message: messages.unitIsRequired }),
			label: z.string().min(1, { message: messages.unitIsRequired })
		},
		{
			required_error: messages.unitIsRequired,
			invalid_type_error: messages.unitIsRequired
		}
	)
	.or(z.null())
	.refine(value => value !== null, { message: messages.unitIsRequired });

export const validateClient = z
	.object(
		{
			value: z.string().min(1, { message: messages.clientIsRequired }),
			label: z.string().min(1, { message: messages.clientIsRequired })
		},
		{
			required_error: messages.clientIsRequired,
			invalid_type_error: messages.clientIsRequired
		}
	)
	.or(z.null())
	.refine(value => value !== null, { message: messages.clientIsRequired });

export const validateCurrency = z
	.object(
		{
			value: z.string().min(1, { message: messages.currencyIsRequired }),
			label: z.string().min(1, { message: messages.currencyIsRequired })
		},
		{
			required_error: messages.currencyIsRequired,
			invalid_type_error: messages.currencyIsRequired
		}
	)
	.or(z.null())
	.refine(value => value !== null, { message: messages.currencyIsRequired });

// Server side validation
export const validateServerTotalAmount = z
	.number()
	.min(1, { message: messages.totalAmountIsRequired });

export const validateServerUnit = z.string().min(1, { message: messages.unitIsRequired });

export const validateServerClient = z.string().min(1, { message: messages.clientIsRequired });

export const validateServerCurrency = z.string().min(1, { message: messages.currencyIsRequired });
