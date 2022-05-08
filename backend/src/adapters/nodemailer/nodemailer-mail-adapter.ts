import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '4dab125f734d7e',
		pass: '582845d665de92',
	},
});

export class NodeMailerMailAdapter implements MailAdapter {
	async sendMail(data: SendMailData) {
		const { subject, body } = data;

		await transport.sendMail({
			from: 'Equipe Feedget <oi@feedget.com>',
			to: 'Lucas Tumeleiro <lucasftumeleiro@gmail.com>',
			subject: subject,
			html: body,
		});
	}
}
