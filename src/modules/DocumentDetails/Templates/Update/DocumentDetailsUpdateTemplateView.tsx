"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import Loader from "@/components/ui/loader";
import LoadingBoundary from "@/components/ui/loading-boundary";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { editorConfiguration } from "@/core/Helpers";
import useDocumentDetailsUpdate from "@/modules/DocumentDetails/Hooks/useDocumentDetailsUpdate";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function DocumentDetailsUpdateTemplateView() {
	const { form, isLoading, isFormSubmitting, onSubmit } = useDocumentDetailsUpdate();

	return (
		<LoadingBoundary isLoading={isLoading} fallback={<Loader height="calc(-144px + 100vh)" />}>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Update Document Details</h3>
					<p className="text-sm text-muted-foreground">
						Update the document details here.
					</p>
				</div>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
						encType="multipart/form-data"
					>
						<FormField
							control={form.control}
							name="beneficiaryDetails"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Beneficiary Details</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter beneficiary details"
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
							name="termsAndConditions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Terms and Conditions</FormLabel>
									<FormControl>
										<CKEditor
											editor={ClassicEditor}
											onChange={(_, editor) => {
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
						<div className="flex justify-end gap-4">
							<LoadingButton
								text={"Update"}
								loadingText={"Updating..."}
								isLoading={isFormSubmitting}
							/>
						</div>
					</form>
				</Form>
			</div>
		</LoadingBoundary>
	);
}
