import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IUserRequest {
	email: string;
}

export default class SendForgotPasswordEmailService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({ email }: IUserRequest): Promise<void> {
		const userRepositories = getCustomRepository(UsersRepository);
		const userTokenRepositories = getCustomRepository(UserTokensRepository);

		const user = await userRepositories.findByEmail(email);

		if (!user) {
			throw new AppError('User does not exists..');
		}

		const { token } = await userTokenRepositories.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		await EtherealMail.sendMail({
			to: {
				name: user.username,
				email: user.email,
			},
			subject: '[API BETS] Recuperação de SENHA',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.username,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
				},
			},
		});
	}
}
