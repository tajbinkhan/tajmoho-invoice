import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface WelcomeEmailProps {
	userName?: string;
	previewText: string;
}

export const WelcomeEmail = ({ userName, previewText }: WelcomeEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={
							"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						}
						width="40"
						height="33"
						alt="Tailwind"
					/>
					<Section>
						<Text style={text}>Hi {userName},</Text>
						<Text style={text}>
							You&apos;ve successfully registered to our website. You will
							receive a verification email to activate your account.
						</Text>
						<Text style={text}>
							If you didn&apos;t registered in our website, then just ignore and
							delete this message.
						</Text>
						<Text style={text}>
							To keep your account secure, please don&apos;t forward this email
							to anyone.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default WelcomeEmail;

const main = {
	backgroundColor: "#f6f9fc",
	padding: "10px 0",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #f0f0f0",
	padding: "45px",
};

const text = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#404040",
	lineHeight: "26px",
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
	padding: "14px 7px",
};

const anchor = {
	textDecoration: "underline",
};
