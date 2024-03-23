const Dump: React.FC<DumpProps> = ({ className = "p-4 bg-gray-50 text-xl", data, indent = 4 }) => {
	const formattedData = JSON.stringify(data, null, indent);

	return <pre className={className}>{formattedData}</pre>;
};

export default Dump;
