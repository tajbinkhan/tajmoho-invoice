"use client";

import ProfilePasswordChangeForm from "@/modules/Profile/Templates/Form/ProfilePasswordChangeForm";
import ProfileUpdateForm from "@/modules/Profile/Templates/Form/ProfileUpdateForm";

export default function ProfileTemplateView() {
	return (
		// <div className="space-y-5">
		// 	<ProfileUpdateForm />
		// 	<ProfilePasswordChangeForm />
		// </div>
		<div className="flex w-full justify-center">
			<div className="flex max-w-lg flex-col justify-center gap-4">
				<ProfileUpdateForm />
				<ProfilePasswordChangeForm />
			</div>
		</div>
	);
}
