import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import authConfig from '@config/auth';

interface IUserRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

export default class CreateSessionsService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		email,
		password,
	}: IUserRequest): Promise<IResponse> {
		const userRepositories = getCustomRepository(UsersRepository);

		const user = await userRepositories.findByEmail(email);

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
