import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IUserRequest {
	token: string;
	password: string;
}

export default class ResetPasswordService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({ token, password }: IUserRequest): Promise<void> {
		const userRepositories = getCustomRepository(UsersRepository);
		const userTokenRepositories = getCustomRepository(UserTokensRepository);

		const userToken = await userTokenRepositories.findByToken(token);

		if (!userToken) {
			throw new AppError('User Token does not exists..');
		}

		const user = await userRepositories.findById(userToken.user_id);

		if (!user) {
			throw new AppError('User does not exists..');
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired.');
		}

		user.password = await hash(password, 8);

		await userRepositories.save(user);
	}
}
