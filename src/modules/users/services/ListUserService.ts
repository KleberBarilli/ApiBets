import { injectable, inject } from 'tsyringe';
import { IPaginateUser } from '../domain/models/IPaginateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export default class ListUserService {
	constructor(
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	public async execute(): Promise<IUser[]> {
		const users = await this.usersRepository.findAll();

		return users;
	}
}
