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

export const validateServerTotalAmount = z
	.number()
	.min(1, { message: messages.totalAmountIsRequired });
