import { Env } from '@/core/Env';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

const sendEmail = async (email: string, emailSubject: string, template: any) => {
	// Configure your email transporter (replace placeholders with actual values)
	const transporter = nodemailer.createTransport({
		host: Env.EMAIL_SERVER_HOST,
		auth: {
			user: Env.EMAIL_SERVER_USER,
			pass: Env.EMAIL_SERVER_PASSWORD,
		},
		secure: true,
	});

	const emailHtml = render(template);

	// Email content
	const mailOptions = {
		from: Env.EMAIL_FROM as string,
		to: email,
		reply_to: Env.EMAIL_FROM as string,
		subject: emailSubject,
		html: emailHtml,
	};

	// Send the email
	try {
		const report = await transporter.sendMail(mailOptions);
		return Promise.resolve(report);
	} catch (error) {
		return Promise.reject(error);
	}
};

export default sendEmail;
