import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		username,
		email,
		password,
	}: ICreateUser): Promise<IUser> {
		const usernameExists = await this.usersRepository.findByName(username);
		const emailExists = await this.usersRepository.findByEmail(email);

		if (usernameExists) {
			throw new AppError('Username already exist');
		}
		if (emailExists) {
			throw new AppError('Email already exist');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			username,
			email,
			password: hashedPassword,
		});

		return user;
	}
}
