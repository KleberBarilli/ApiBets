import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokenRepository,
);

//container.registerSingleton<IUsersRepository>(
//	'UsersRepository',
//	UsersRepository,
//);

//container.registerSingleton<IUsersRepository>(
//	'UsersRepository',
//	UsersRepository,
//);

//container.registerSingleton<IUsersRepository>(
//	'UsersRepository',
//	UsersRepository,
//);
