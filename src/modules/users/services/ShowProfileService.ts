import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
	user_id: string;
}

export default class ShowProfileService {
	async execute({ user_id }: IRequest): Promise<User> {
		const usersRepositories = getCustomRepository(UsersRepository);

		const user = await usersRepositories.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		return user;
	}
}
