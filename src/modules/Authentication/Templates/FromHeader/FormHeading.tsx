import BrandLogo from "@/components/common/BrandLogo";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function FormHeading(props: any) {
	return (
		<div
			{...props}
			className={cn(props.className || "text-center sm:mx-auto sm:w-full sm:max-w-md")}
		>
			<Link href={`/`}>
				<BrandLogo className={`mx-auto size-36 rounded-full bg-gray-50 shadow-sm`} />
			</Link>

			<h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
				{props.title || "Untitled"}
			</h2>
		</div>
	);
}
