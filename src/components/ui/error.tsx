interface IError {
	heading?: string;
	message?: string;
}

export default function Error({
	heading = "Error while fetching data",
	message = "Please check back later."
}: IError) {
	return (
		<div className="flex min-h-full flex-col bg-white pb-12 pt-16">
			<main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
				<div className="py-16">
					<div className="text-center">
						<p className="text-base font-semibold text-indigo-600">Oops!</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							{heading}
						</h1>
						<p className="mt-2 text-base text-gray-500">{message}</p>
					</div>
				</div>
			</main>
		</div>
	);
}
