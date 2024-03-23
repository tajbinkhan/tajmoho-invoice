import { siteTitle } from "@/core/Helpers";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BrandLogo({
	className = "size-8",
	brandName = siteTitle,
	width = 150,
	height = 150
}: BrandLogoInterface) {
	return (
		<Image
			src="/images/logo.webp"
			alt={brandName}
			width={width}
			height={height}
			className={cn(className)}
			priority
		/>
	);
}
