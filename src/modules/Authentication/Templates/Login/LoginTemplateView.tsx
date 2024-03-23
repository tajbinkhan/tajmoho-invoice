import BrandLogo from "@/components/common/BrandLogo";
import LoginFormView from "@/modules/Authentication/Templates/Login/Form/LoginFormView";

import { cn } from "@/lib/utils";
import Link from "next/link";

function FormHeading(props: any) {
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

export function LoginTemplateView() {
	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<FormHeading className={`my-4 text-center`} title={"Account Login"} />

			<div className="bg-white p-6 shadow sm:rounded-lg">
				<LoginFormView />
			</div>
		</div>
	);
}
