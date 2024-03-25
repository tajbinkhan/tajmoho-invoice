import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import { errors } from "@/core/Errors";
import { successes } from "@/core/Successes";
import { withAuthUser } from "@/middlewares/AuthenticationMiddleware";
import UserCreateAction from "@/modules/Authentication/Actions/UserAction";
import UserRepository from "@/modules/Authentication/Repositories/UserRepository";
import PasswordResetEmail from "@/modules/Authentication/SubModules/Token/Accessories/Email/Templates/Token/PasswordResetEmail";
import VerificationEmail from "@/modules/Authentication/SubModules/Token/Accessories/Email/Templates/Token/VerificationEmail";
import TokenEmailService from "@/modules/Authentication/SubModules/Token/Accessories/Email/TokenEmail";
import TokenRepository from "@/modules/Authentication/SubModules/Token/Repositories/TokenRepository";
import { EmailVerificationSchema } from "@/validators/EmailVerification.schema";
import { PasswordChangeSchema, PasswordChangeSchemaType } from "@/validators/PasswordChange.schema";
import { TokenType } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export default class UserController extends ApiController implements ApiCrudController {
	private usersRepo: UserRepository;
	private tokenRepo: TokenRepository;
	private tokenEmail: TokenEmailService;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.usersRepo = new UserRepository();
		this.tokenRepo = new TokenRepository();
		this.tokenEmail = new TokenEmailService();
	}

	async index() {
		try {
			const users = await this.usersRepo.retrieveAll();

			return ApiResponse.success(successes.allDataRetrieved, users);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();

			const executeData = new UserCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created(successes.dataCreated, createData);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.usersRepo.retrieve(id);

			return ApiResponse.success(successes.dataRetrieved, retrieveData);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();

			const updateData = await this.usersRepo.update(id, body);

			return ApiResponse.success(successes.dateUpdated, updateData);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async delete(id: string) {
		try {
			await this.usersRepo.delete(id);

			return ApiResponse.success(successes.dataDeleted);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.usersRepo.deleteAll();

			return ApiResponse.success(successes.allDataDeleted, deleteData);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async tokenAuthentication() {
		try {
			const body: Credentials = await this.getReqBody();
			const tokenData = await this.usersRepo.tokenAuth(body);
			const data = {
				accessToken: tokenData
			};

			return ApiResponse.success(successes.tokenAuthenticated, data);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async checkAccountVerification() {
		try {
			const body: { email: string } = await this.getReqBody();

			const verifyData = await this.usersRepo.checkVerification(body.email);

			return ApiResponse.success(successes.accountVerified, verifyData);
		} catch (error: any) {
			if (error.message === errors.userNotFound) {
				return ApiResponse.notFound(errors.userNotFound);
			} else if (error.message === errors.userIsNotVerified) {
				return ApiResponse.badRequest(errors.userIsNotVerified);
			}
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async accountVerificationEmailSend() {
		try {
			const { email } = await this.getReqBody();
			EmailVerificationSchema.parse({ email });

			const user = await this.usersRepo.findByEmail(email);

			if (!user) {
				return ApiResponse.notFound(errors.userNotFound);
			}

			const sendTokenEmail = await this.tokenEmail.TokenEmailSend(
				email,
				"User Verification Email",
				"verification",
				TokenType.AUTHENTICATION_TOKEN,
				"Verify your email address",
				VerificationEmail
			);

			return ApiResponse.success(successes.verificationEmailSent, sendTokenEmail);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				return ApiResponse.badRequest(error.errors.map(e => e.message).join(", "));
			} else {
				return ApiResponse.error(errors.internalServerError, error);
			}
		}
	}

	async accountVerificationComplete() {
		try {
			const body: { token: string; tokenType: TokenType } = await this.getReqBody();

			const verifyUser = await this.tokenRepo.userTokenVerification(
				body.tokenType,
				body.token
			);

			return ApiResponse.success(successes.accountVerified, verifyUser);
		} catch (error: any) {
			if (error instanceof PrismaClientValidationError) {
				return ApiResponse.badRequest(errors.invalidTokenType);
			} else if (error === errors.invalidToken) {
				return ApiResponse.badRequest(errors.invalidToken);
			} else {
				return ApiResponse.error(errors.internalServerError, error);
			}
		}
	}

	async changePassword() {
		try {
			const auth = await withAuthUser();

			const userId = auth?.user.id;
			const body: PasswordChangeSchemaType = await this.getReqBody();
			const { oldPassword, newPassword, confirmPassword } = body;

			PasswordChangeSchema.parse({
				oldPassword,
				newPassword,
				confirmPassword
			});
			const changePasswordData = await this.usersRepo.changePassword(userId, {
				oldPassword,
				newPassword,
				confirmPassword
			});

			return ApiResponse.success(successes.passwordChanged, changePasswordData);
		} catch (error: any) {
			if (error.message === errors.unauthorized) {
				return ApiResponse.unauthorized(errors.unauthorized);
			} else if (error.message === errors.oldPasswordNotMatch) {
				return ApiResponse.badRequest(errors.oldPasswordNotMatch);
			} else if (error.message === errors.newPasswordCannotBeSame) {
				return ApiResponse.badRequest(errors.newPasswordCannotBeSame);
			} else if (error.message === errors.userNotFound) {
				return ApiResponse.notFound(errors.userNotFound);
			} else if (error instanceof z.ZodError) {
				return ApiResponse.badRequest(error.errors.map(e => e.message).join(", "));
			} else {
				return ApiResponse.error(errors.internalServerError, error);
			}
		}
	}

	async passwordResetEmailSend() {
		try {
			const { email } = await this.getReqBody();

			const user = await this.usersRepo.findByEmail(email);

			if (!user) {
				return ApiResponse.notFound(errors.userNotFound);
			}

			const sendTokenEmail = await this.tokenEmail.TokenEmailSend(
				email,
				"Password Reset",
				"password-reset",
				TokenType.PASSWORD_RESET_TOKEN,
				"Reset your password",
				PasswordResetEmail
			);

			return ApiResponse.success(successes.passwordEmailSent, sendTokenEmail);
		} catch (error: any) {
			return ApiResponse.error(errors.internalServerError, error);
		}
	}

	async passwordResetComplete() {
		try {
			const body: { token: string; tokenType: TokenType; password: string } =
				await this.getReqBody();

			const verifyPasswordReset = await this.tokenRepo.passwordResetTokenVerification(
				body.tokenType,
				body.token,
				body.password
			);

			return ApiResponse.success(successes.passwordReset, verifyPasswordReset);
		} catch (error: any) {
			if (error instanceof PrismaClientValidationError) {
				return ApiResponse.badRequest(errors.invalidTokenType);
			} else if (error === errors.invalidToken) {
				return ApiResponse.badRequest(errors.invalidToken);
			} else {
				return ApiResponse.error(errors.internalServerError, error);
			}
		}
	}
}
