import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	user_id: string;
	username: string;
	email: string;
	password?: string;
	old_password?: string;
}

export default class UpdateProfileService {
	async execute({
		user_id,
		username,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const usersRepositories = getCustomRepository(UsersRepository);

		const user = await usersRepositories.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		const userUpdateEmail = await usersRepositories.findByEmail(email);

		if (userUpdateEmail && userUpdateEmail.id != user.id) {
			throw new AppError('There is already one user with this email');
		}

		if (password && !old_password) {
			throw new AppError('Old password is missing');
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}
			user.password = await hash(password, 8);
		}

		user.username = username;
		user.email = email;

		await usersRepositories.save(user);

		return user;
	}
}
