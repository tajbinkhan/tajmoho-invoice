import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputFileProps = Omit<
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
	"form"
>;

type FileUploadProps<T extends FieldValues = FieldValues> = InputFileProps & {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
};

export default function FileUpload<T extends FieldValues = FieldValues>({
	form,
	name,
	label,
	...props
}: FileUploadProps<T>) {
	return (
		<div className="space-y-1.5">
			<FormLabel
				htmlFor={name}
				className={cn(
					form.formState.errors[name] && "text-destructive",
					"pb-2"
				)}
			>
				{label}
			</FormLabel>
			<Input id={name} type="file" {...form.register(name)} {...props} />
			{form.formState.errors[name] && (
				<p className="text-sm font-medium text-destructive">
					{form.formState.errors[name]?.message?.toString()}
				</p>
			)}
		</div>
	);
}
