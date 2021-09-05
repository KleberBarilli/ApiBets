import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IBetsRepository } from '@modules/bets/domain/repositories/IBetsRepository';
import BetsRepository from '@modules/bets/infra/typeorm/repositories/BetsRepository';
container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokenRepository,
);

container.registerSingleton<IBetsRepository>('BetsRepository', BetsRepository);
