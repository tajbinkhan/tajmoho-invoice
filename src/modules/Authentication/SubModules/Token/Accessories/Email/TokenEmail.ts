import { Env } from "@/core/Env";
import sendEmail from "@/modules/Authentication/SubModules/Token/Accessories/Email/SendEmail";
import TokenRepository from "@/modules/Authentication/SubModules/Token/Repositories/TokenRepository";
import { createElement } from "react";

// Function to generate a random verification token
export const generateRandomToken = (length: number) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const tokenLength = length || 32;
	let token = "";

	for (let i = 0; i < tokenLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		token += characters[randomIndex];
	}

	return token;
};

export default class TokenEmailService extends TokenRepository {
	private generateToken(length: number): string {
		return generateRandomToken(length);
	}

	private async saveToken(email: string, TokenType: any): Promise<string> {
		const token = this.generateToken(32);
		const tokenExpiration = new Date();
		tokenExpiration.setHours(tokenExpiration.getHours() + 24);

		try {
			await this.clientModel.create({
				data: {
					identifier: email,
					token,
					tokenType: TokenType,
					expires: tokenExpiration
				}
			});
			return token;
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	private constructURL(internalURL: string, token: string): string {
		const configureURL = `${Env.NEXTAUTH_URL}/${internalURL}/${token}`;
		return configureURL;
	}

	private async sendEmail(
		email: string,
		emailSubject: string,
		link: string,
		previewText: string,
		emailTemplate: React.ComponentType<any>
	): Promise<any> {
		try {
			const sendEmailStatus = await sendEmail(
				email,
				emailSubject,
				createElement(emailTemplate, {
					userName: email,
					resetPasswordLink: link,
					previewText
				})
			);

			return Promise.resolve(sendEmailStatus);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}

	public async TokenEmailSend(
		email: string,
		emailSubject: string,
		internalURL: string,
		TokenType: any,
		previewText: string,
		emailTemplate: React.ComponentType<any>
	): Promise<any> {
		try {
			const token = await this.saveToken(email, TokenType);
			const configuredURL = this.constructURL(internalURL, token);

			const sendEmailStatus = await this.sendEmail(
				email,
				emailSubject,
				configuredURL,
				previewText,
				emailTemplate
			);

			return Promise.resolve(sendEmailStatus);
		} catch (error: any) {
			return Promise.reject(error);
		}
	}
}
