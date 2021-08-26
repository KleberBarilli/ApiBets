import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

export default class UpdateUserAvatarService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const userRepositories = getCustomRepository(UsersRepository);

		const user = await userRepositories.findById(user_id);

		if (!user) {
			throw new AppError('User not found..');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}
		user.avatar = avatarFilename;

		await userRepositories.save(user);

		return user;
	}
}
