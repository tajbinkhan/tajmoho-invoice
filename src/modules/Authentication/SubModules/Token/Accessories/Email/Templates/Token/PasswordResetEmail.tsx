import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Img,
	Preview,
	Section,
	Text
} from "@react-email/components";

interface PasswordResetEmailProps {
	userName?: string;
	resetPasswordLink: string;
	previewText: string;
}

export const PasswordResetEmail = ({
	userName,
	resetPasswordLink,
	previewText
}: PasswordResetEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={
							"https://firebasestorage.googleapis.com/v0/b/tajmoho-invoice.appspot.com/o/Email-Contents%2Flogo.png?alt=media&token=0075f3d2-1373-4924-a4bf-7ea88f299726"
						}
						width="170"
						height="50"
						alt="Tajmoho International"
					/>
					<Section>
						<Text style={text}>Hi {userName},</Text>
						<Text style={text}>
							Someone recently requested a password change for your Dropbox account.
							If this was you, you can set a new password here:
						</Text>
						<Button style={button} href={resetPasswordLink}>
							Reset password
						</Button>
						<Text style={text}>
							If you don&apos;t want to change your password or didn&apos;t request
							this, just ignore and delete this message.
						</Text>
						<Text style={text}>
							To keep your account secure, please don&apos;t forward this email to
							anyone.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default PasswordResetEmail;

const main = {
	backgroundColor: "#f6f9fc",
	padding: "10px 0"
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #f0f0f0",
	padding: "45px"
};

const text = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#404040",
	lineHeight: "26px"
};

const button = {
	backgroundColor: "#007ee6",
	borderRadius: "4px",
	color: "#fff",
	fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	width: "210px",
	padding: "14px 7px"
};

const anchor = {
	textDecoration: "underline"
};
