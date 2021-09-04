import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import authConfig from '@config/auth';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';

interface IUserRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
export default class CreateSessionsService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		email,
		password,
	}: ICreateSession): Promise<IUserAuthenticated> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorret email/password', 401);
		}

		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed) {
			throw new AppError('Incorret email/password', 401);
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return {
			user,
			token,
		};
	}
}
