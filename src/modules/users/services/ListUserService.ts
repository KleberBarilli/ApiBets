import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
	async execute(): Promise<User[]> {
		const usersRepositories = getCustomRepository(UsersRepository);

		const users = await usersRepositories.find();

		return users;
	}
}
