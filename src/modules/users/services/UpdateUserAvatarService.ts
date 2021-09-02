import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

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
		if (uploadConfig.driver === 's3') {
			const s3Provider = new S3StorageProvider();
			if (user.avatar) {
				await s3Provider.deleteFile(user.avatar);
			}
			const fileName = await s3Provider.saveFile(avatarFilename);
			user.avatar = fileName;
		} else {
			const diskProvider = new DiskStorageProvider();
			if (user.avatar) {
				await diskProvider.deleteFile(user.avatar);
			}
			const fileName = await diskProvider.saveFile(avatarFilename);
			user.avatar = fileName;
		}

		await userRepositories.save(user);

		return user;
	}
}
