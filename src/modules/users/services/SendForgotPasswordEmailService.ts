import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

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

		const token = await userTokenRepositories.generate(user.id);

		console.log(token);
	}
}
