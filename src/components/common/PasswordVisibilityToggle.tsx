"use client";

import { Input, InputProps } from "@/components/ui/input";
import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordVisibilityToggle = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
	const [visible, setVisible] = useState(false);
	return (
		<div className="relative">
			<Input type={visible ? "text" : "password"} ref={ref} {...props} />
			<div className="absolute right-4 top-1/2 -translate-y-1/2">
				{visible ? (
					<FaEye className="cursor-pointer" onClick={() => setVisible(!visible)} />
				) : (
					<FaEyeSlash className="cursor-pointer" onClick={() => setVisible(!visible)} />
				)}
			</div>
		</div>
	);
});

PasswordVisibilityToggle.displayName = "PasswordVisibilityToggle";

export default PasswordVisibilityToggle;
