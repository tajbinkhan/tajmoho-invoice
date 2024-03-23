"use client";

import { DNA } from "react-loader-spinner";

const Loader = ({ height }: { height?: string }) => {
	return (
		<div
			className="flex flex-col items-center justify-center"
			style={{
				height: height ? height : "100vh"
			}}
		>
			<DNA
				height="80"
				width="80"
				ariaLabel="dna-loading"
				wrapperStyle={{}}
				wrapperClass="dna-wrapper"
				visible={true}
			/>
		</div>
	);
};

export default Loader;
