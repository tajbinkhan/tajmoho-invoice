import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useCustomSWR = (path: string | string[], refreshInterval?: number) => {
	const { data, error, mutate, isLoading, isValidating } = useSWR(
		path,
		fetcher,
		{
			refreshInterval,
		}
	);

	return {
		data,
		error,
		isLoading,
		isValidating,
		refresh: mutate,
	};
};

export default useCustomSWR;
