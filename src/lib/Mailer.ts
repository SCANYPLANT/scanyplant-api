import * as nodemailler from 'nodemailer';
import { User } from '../entity';

export async function sendMail(
    user: User,
    subject?: string,
    html?: string,
): Promise<boolean> {
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
        .then((e) => {
            console.log(e);
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
}
