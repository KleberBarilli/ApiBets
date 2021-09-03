import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

export default class ListUserService {
	async execute(): Promise<User[]> {
		const usersRepositories = getCustomRepository(UsersRepository);

		const users = await usersRepositories.find();

		return users;
	}
}
