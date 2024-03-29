import { DatePicker } from "@/components/rebuild/FormFields";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { LoadingButton } from "@/components/ui/loading-button";
import NumericInput from "@/components/ui/numeric-input";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SelectStyles, editorConfiguration } from "@/core/Helpers";
import { BillInvoiceSchemaType } from "@/validators/BillInvoice.schema";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { UseFormReturn } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Select from "react-select";

interface IField {
	id: string;
	colorName: string;
	colorCount: string;
	quantity: string | number;
	unit: {
		label: string;
		value: string;
	} | null;
	unitPrice: string | number;
}

interface IBillInvoiceForm {
	form: UseFormReturn<BillInvoiceSchemaType>;
	setOpenClientForm: React.Dispatch<React.SetStateAction<boolean>>;
	clientsOptions: { label: string; value: string }[];
	currencyOptions: { label: string; value: string }[];
	unitOptions: { label: string; value: string }[];
	customTotalAmount: boolean;
	customTermsAndConditions: boolean;
	isFormSubmitting: boolean;
	onSubmit: (data: BillInvoiceSchemaType) => void;
	fields: IField[];
	append: (data: any) => void;
	remove: (index: number) => void;
	clientsIsLoading: boolean;
	clientsRefresh: () => void;
	documentIsLoading: boolean;
	text: string;
	loadingText: string;
}

export default function BillInvoiceForm({
	form,
	setOpenClientForm,
	clientsOptions,
	currencyOptions,
	unitOptions,
	customTotalAmount,
	customTermsAndConditions,
	isFormSubmitting,
	onSubmit,
	fields,
	append,
	remove,
	clientsIsLoading,
	documentIsLoading,
	text,
	loadingText
}: IBillInvoiceForm) {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				encType="multipart/form-data"
			>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="billNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Invoice Number</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter invoice number"
										disabled={isFormSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="billDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Invoice Date</FormLabel>
								<DatePicker field={field} />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="client"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Clients</FormLabel>
								<FormControl>
									<div className="flex gap-4">
										<Select
											placeholder="Select a client"
											isDisabled={isFormSubmitting}
											options={clientsOptions}
											isClearable
											isLoading={clientsIsLoading}
											styles={SelectStyles}
											{...field}
											className="w-full"
										/>
										<div className="col-span-1">
											<TooltipProvider delayDuration={0}>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															type="button"
															onClick={() => setOpenClientForm(true)}
														>
															<FaPlus />
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p>Add Client</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="currency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Currency</FormLabel>
								<FormControl>
									<Select
										placeholder="Select a currency"
										isDisabled={isFormSubmitting}
										options={currencyOptions}
										isClearable
										styles={SelectStyles}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter description"
										disabled={isFormSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full space-y-4 rounded-md border p-4">
					{fields.map((field, index) => (
						<div key={field.id} className="flex gap-4">
							<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-5">
								<FormField
									control={form.control}
									name={`products.${index}.colorName`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter color name"
													disabled={isFormSubmitting}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`products.${index}.colorCount`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color Count</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter color count"
													disabled={isFormSubmitting}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`products.${index}.quantity`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<NumericInput
													placeholder="Enter quantity"
													disabled={isFormSubmitting}
													numberSign="positive"
													numberType="decimal"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`products.${index}.unit`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Unit</FormLabel>
											<FormControl>
												<Select
													placeholder="Select a unit"
													isDisabled={isFormSubmitting}
													options={unitOptions}
													isClearable
													styles={SelectStyles}
													{...field}
													className="w-full"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`products.${index}.unitPrice`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Unit Price</FormLabel>
											<FormControl>
												<NumericInput
													placeholder="Enter unit price"
													disabled={isFormSubmitting}
													numberSign="positive"
													numberType="decimal"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{fields.length > 1 && (
								<div className="mt-8 flex justify-end gap-4">
									<Button
										variant={"destructive"}
										type="button"
										onClick={() => remove(index)}
										disabled={isFormSubmitting}
									>
										<FaMinus />
									</Button>
								</div>
							)}
						</div>
					))}

					<Button
						type="button"
						onClick={() =>
							append({
								productName: "",
								quantity: "",
								unit: null,
								unitPrice: ""
							})
						}
						disabled={isFormSubmitting}
					>
						Add Product
					</Button>
					{form.formState.errors.products && (
						<FormMessage>{form.formState.errors.products.message}</FormMessage>
					)}
				</div>

				{customTotalAmount && (
					<div className="w-full">
						<FormField
							control={form.control}
							name="totalAmount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total Amount</FormLabel>
									<FormControl>
										<NumericInput
											placeholder="Enter total amount"
											disabled={isFormSubmitting}
											numberSign="positive"
											numberType="decimal"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				{customTermsAndConditions &&
					(documentIsLoading ? (
						<Loader height="10vh" />
					) : (
						<div className="w-full">
							<FormField
								control={form.control}
								name="termsAndConditions"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Terms and Conditions</FormLabel>
										<FormControl>
											<CKEditor
												editor={ClassicEditor}
												onChange={(event, editor) => {
													const data = editor.getData();
													field.onChange(data);
												}}
												data={field.value}
												config={editorConfiguration}
												disabled={isFormSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}

				<div className="flex flex-wrap gap-4">
					<FormField
						control={form.control}
						name="customTotalAmount"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="flex cursor-pointer items-center space-x-2">
										<Switch
											id="custom-total-amount"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<FormLabel
											htmlFor="custom-total-amount"
											className="cursor-pointer"
										>
											{field.value
												? "Disable Custom Total Amount"
												: "Enable Custom Total Amount"}
										</FormLabel>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="customTermsAndConditions"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="flex cursor-pointer items-center space-x-2">
										<Switch
											id="custom-terms-and-conditions"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<FormLabel
											htmlFor="custom-terms-and-conditions"
											className="cursor-pointer"
										>
											{field.value
												? "Disable Custom Terms & Conditions"
												: "Enable Custom Terms & Conditions"}
										</FormLabel>
									</div>
								</FormControl>
								<FormMessage />
								{!field.value && form.formState.errors.termsAndConditions && (
									<FormMessage>
										{form.formState.errors.termsAndConditions.message}
									</FormMessage>
								)}
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-end gap-4">
					<LoadingButton
						text={text}
						loadingText={loadingText}
						isLoading={isFormSubmitting}
					/>
				</div>
			</form>
		</Form>
	);
}
