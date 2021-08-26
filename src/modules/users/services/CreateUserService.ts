import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUserRequest {
	username: string;
	email: string;
	password: string;
}

export default class CreateUserService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		username,
		email,
		password,
	}: IUserRequest): Promise<User> {
		const userRepositories = getCustomRepository(UsersRepository);
		const usernameExists = await userRepositories.findByName(username);
		const emailExists = await userRepositories.findByEmail(email);

		if (usernameExists) {
			throw new AppError('Username already exist');
		}
		if (emailExists) {
			throw new AppError('Email already exist');
		}

		const user = userRepositories.create({
			username,
			email,
			password,
		});

		await userRepositories.save(user);

		return user;
	}
}
