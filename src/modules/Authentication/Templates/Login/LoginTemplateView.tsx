import { FormHeading } from "@/modules/Authentication/Templates/FromHeader/FormHeading";
import LoginFormView from "@/modules/Authentication/Templates/Login/Form/LoginFormView";

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
