import { ApiController, ApiCrudController } from "@/core/ApiController";
import ApiResponse from "@/core/ApiResponse";
import { withAuthUser } from "@/middlewares/AuthenticationMiddleware";
import UserCreateAction from "@/modules/Authentication/Actions/UserAction";
import UserRepository from "@/modules/Authentication/Repositories/UserRepository";
import PasswordResetEmail from "@/modules/Authentication/SubModules/Token/Accessories/Email/Templates/Token/PasswordResetEmail";
import VerificationEmail from "@/modules/Authentication/SubModules/Token/Accessories/Email/Templates/Token/VerificationEmail";
import TokenEmailService from "@/modules/Authentication/SubModules/Token/Accessories/Email/TokenEmail";
import TokenRepository from "@/modules/Authentication/SubModules/Token/Repositories/TokenRepository";
import { EmailVerificationSchema } from "@/validators/EmailVerification.schema";
import { PasswordChangeSchema } from "@/validators/PasswordChange.schema";
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

			return ApiResponse.success("All users retrieved successfully", users);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();

			const executeData = new UserCreateAction();
			const createData = await executeData.execute(body);

			return ApiResponse.created("User created successfully", createData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async show(id: string) {
		try {
			const retrieveData = await this.usersRepo.retrieve(id);

			return ApiResponse.success("User retrieved successfully", retrieveData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async update(id: string) {
		try {
			const body = await this.getReqBody();

			const updateData = await this.usersRepo.update(id, body);

			return ApiResponse.success("User updated successfully", updateData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async delete(id: string) {
		try {
			await this.usersRepo.delete(id);

			return ApiResponse.success("User deleted successfully");
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async deleteAll() {
		try {
			const deleteData = await this.usersRepo.deleteAll();

			return ApiResponse.success("All users deleted successfully", deleteData);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async tokenAuthentication() {
		try {
			const body: Credentials = await this.getReqBody();
			const tokenData = await this.usersRepo.tokenAuth(body);
			const data = {
				accessToken: tokenData
			};

			return ApiResponse.success("Token authenticated successfully", data);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
		}
	}

	async checkAccountVerification() {
		try {
			const body: { email: string } = await this.getReqBody();

			const verifyData = await this.usersRepo.checkVerification(body.email);

			return ApiResponse.success("Account is verified", verifyData);
		} catch (error: any) {
			if (error.message === "User not found") {
				return ApiResponse.notFound("User not found");
			} else if (error.message === "User is not verified") {
				return ApiResponse.badRequest("User is not verified");
			}
			return ApiResponse.error(error.message, error);
		}
	}

	async accountVerificationEmailSend() {
		try {
			const { email } = await this.getReqBody();
			EmailVerificationSchema.parse({ email });

			const user = await this.usersRepo.findByEmail(email);

			if (!user) {
				return ApiResponse.notFound("User not found");
			}

			const sendTokenEmail = await this.tokenEmail.TokenEmailSend(
				email,
				"User Verification Email",
				"verification",
				TokenType.AUTHENTICATION_TOKEN,
				"Verify your email address",
				VerificationEmail
			);

			return ApiResponse.success("Verification email sent successfully", sendTokenEmail);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				return ApiResponse.badRequest(error.errors.map(e => e.message).join(", "));
			} else {
				return ApiResponse.error(error.message, error);
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

			return ApiResponse.success("User verified successfully", verifyUser);
		} catch (error: any) {
			if (error instanceof PrismaClientValidationError) {
				return ApiResponse.badRequest("Invalid token type");
			} else if (error === "Invalid token") {
				return ApiResponse.badRequest("Invalid token");
			} else {
				return ApiResponse.error(error.message, error);
			}
		}
	}

	async changePassword() {
		try {
			const auth = await withAuthUser();

			const userId = auth?.user.id;
			const body: ChangePasswordInterface = await this.getReqBody();
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

			return ApiResponse.success("Password changed successfully", changePasswordData);
		} catch (error: any) {
			if (error.message === "Unauthorized Access") {
				return ApiResponse.unauthorized("Unauthorized Access");
			} else if (error === "Old password is incorrect") {
				return ApiResponse.badRequest("Old password is incorrect");
			} else if (error === "User not found") {
				return ApiResponse.notFound("User not found");
			} else if (error instanceof z.ZodError) {
				return ApiResponse.badRequest(error.errors.map(e => e.message).join(", "));
			} else {
				return ApiResponse.error(error.message, error);
			}
		}
	}

	async passwordResetEmailSend() {
		try {
			const { email } = await this.getReqBody();

			const user = await this.usersRepo.findByEmail(email);

			if (!user) {
				return ApiResponse.notFound("User not found");
			}

			const sendTokenEmail = await this.tokenEmail.TokenEmailSend(
				email,
				"Password Reset",
				"password-reset",
				TokenType.PASSWORD_RESET_TOKEN,
				"Reset your password",
				PasswordResetEmail
			);

			return ApiResponse.success("Password reset email sent successfully", sendTokenEmail);
		} catch (error: any) {
			return ApiResponse.error(error.message, error);
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

			return ApiResponse.success("Password has been reset successfully", verifyPasswordReset);
		} catch (error: any) {
			if (error instanceof PrismaClientValidationError) {
				return ApiResponse.badRequest("Invalid token type");
			} else if (error === "Invalid token") {
				return ApiResponse.badRequest("Invalid token");
			} else {
				return ApiResponse.error(error.message, error);
			}
		}
	}
}
