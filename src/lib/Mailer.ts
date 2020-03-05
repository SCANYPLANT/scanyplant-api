import * as nodemailler from 'nodemailer';
import { User } from '../entity/User';

export async function sendMail(
    user: User,
    subject?: string,
    html?: string,
): Promise<boolean> {
    // const account = await nodemailler.createTestAccount();
    return nodemailler
        .createTransport({
            service: 'gmail',
            port: 2525,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        })
        .sendMail({
            from: process.env.GMAIL_EMAIL,
            to: user.email,
            subject,
            text: 'Mys3',
            html,
        })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
