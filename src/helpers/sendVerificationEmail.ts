import { render } from "@react-email/render";
import { getMailerConfigError, mailer } from "@/lib/mailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const configError = getMailerConfigError();
        if (configError) {
            return { success: false, message: configError };
        }

        const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;

        const html = await render(
            VerificationEmail({ username, otp: verifyCode })
        );

        await mailer.sendMail({
            from,
            to: email,
            subject: 'Mystry Message | Verification code',
            html,
        });

        return { success: true, message: 'Successfully sent verification email' }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);

        return { success: false, message: 'Failed to send verification email' }
    }
}
