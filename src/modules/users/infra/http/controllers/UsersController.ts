import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUser = new ListUserService();

		const users = await listUser.execute();
		console.log(req.user.id);

		return res.json(classToClass(users));
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { username, email, password } = req.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			username,
			email,
			password,
		});

		return res.json(classToClass(user));
	}
}
