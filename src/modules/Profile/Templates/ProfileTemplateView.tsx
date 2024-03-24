"use client";

import ProfilePasswordChangeForm from "@/modules/Profile/Templates/Form/ProfilePasswordChangeForm";
import ProfileUpdateForm from "@/modules/Profile/Templates/Form/ProfileUpdateForm";

export default function ProfileTemplateView() {
	return (
		<div className="space-y-5">
			<ProfileUpdateForm />
			<ProfilePasswordChangeForm />
		</div>
	);
}
