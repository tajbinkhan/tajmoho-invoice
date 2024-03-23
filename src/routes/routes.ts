import { Env } from "@/core/Env";

const apiRoutePrefix =
	process.env.NODE_ENV === "production"
		? Env.NEXT_PUBLIC_LIVE_BACKEND_API_URL
		: Env.NEXT_PUBLIC_BACKEND_API_URL;

const dashboardPrefix = "/dashboard";

export const route = {
	public: {
		home: "/",
		login: "/login"
	},
	dashboardRoute: {
		home: `${dashboardPrefix}`,
		profile: `${dashboardPrefix}/profile`,
		billInvoice: `${dashboardPrefix}/bill-invoice`,
		proformaInvoice: `${dashboardPrefix}/proforma-invoice`,
		proformaInvoiceCreate: `${dashboardPrefix}/proforma-invoice/create`,
		clients: `${dashboardPrefix}/clients`,
		documentDetails: `${dashboardPrefix}/document-details`,
		documentDetailsUpdate: `${dashboardPrefix}/document-details/update`,
		settings: `${dashboardPrefix}/settings`
	},
	apiRoute: {
		checkDBConnection: `${apiRoutePrefix}/db-connection`,
		accountVerification: `${apiRoutePrefix}/auth/account-verification`,
		passwordChange: `${apiRoutePrefix}/auth/password-change`,
		passwordReset: `${apiRoutePrefix}/auth/password-reset`,
		passwordResetDone: `${apiRoutePrefix}/auth/password-reset/done`,
		tokenAuthentication: `${apiRoutePrefix}/auth/token-authentication`,
		userAuthentication: `${apiRoutePrefix}/auth/user-authentication`,
		userVerification: `${apiRoutePrefix}/auth/user-verification`,
		userVerificationDone: `${apiRoutePrefix}/auth/user-verification/done`,
		clients: `${apiRoutePrefix}/clients`,
		documentDetails: `${apiRoutePrefix}/document-details`,
		proformaInvoice: `${apiRoutePrefix}/proforma-invoice`
	}
} as const;
