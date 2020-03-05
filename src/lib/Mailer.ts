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
            service: 'Mailjet',
            auth: {
                user: process.env.MJ_APIKEY_PUBLIC,
                pass: process.env.MJ_APIKEY_PRIVATE,
            },
        })
        .sendMail({
            from: 'ibrahima.Dansoko@outlook.com',
            to: user.email,
            subject,
            text: 'scanyPlant',
            html,
        })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
