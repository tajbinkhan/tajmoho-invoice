import React from "react";

type ErrorFallbackProps = {
	isError: true;
	errorFallback: React.ReactNode;
};

type NoErrorFallbackProps = {
	isError?: false;
	errorFallback?: never;
};

type LoadingBoundaryProps = {
	isLoading: boolean;
	fallback: React.ReactNode;
	children: React.ReactNode;
} & (ErrorFallbackProps | NoErrorFallbackProps);

export default function LoadingBoundary({
	isLoading,
	fallback,
	children,
	isError,
	errorFallback
}: LoadingBoundaryProps) {
	return <>{isLoading ? fallback : isError ? errorFallback : children}</>;
}
