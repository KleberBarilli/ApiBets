import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();

		createUserService = new CreateUserService(fakeUsersRepository);
	});
	it('Should be able to create a new user', async () => {
		const user = await createUserService.execute({
			username: 'kleber teste',
			email: 'kleber@teste.com',
			password: '123123',
		});

		expect(user).toHaveProperty('id');
	});

	it('Should not be able to create two users with the same email', async () => {
		await createUserService.execute({
			username: 'kleber teste',
			email: 'kleber@teste.com',
			password: '123123',
		});

		expect(
			createUserService.execute({
				username: 'kleber2',
				email: 'kleber@teste.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to create two users with the same username', () => {
		const fakeUsersRepository = new FakeUsersRepository();

		const createUserService = new CreateUserService(fakeUsersRepository);
		expect(
			createUserService.execute({
				username: 'kleber teste',
				email: 'kleber2@teste.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
