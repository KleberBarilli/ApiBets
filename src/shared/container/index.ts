import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IBetsRepository } from '@modules/bets/domain/repositories/IBetsRepository';
import BetsRepository from '@modules/bets/infra/typeorm/repositories/BetsRepository';
import { ILeaguesRepository } from '@modules/leagues/domain/repositories/ILeaguesRepository';
import LeaguesRepository from '@modules/leagues/infra/typeorm/repositories/LeaguesRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokenRepository,
);

container.registerSingleton<IBetsRepository>('BetsRepository', BetsRepository);

container.registerSingleton<ILeaguesRepository>(
	'LeaguesRepository',
	LeaguesRepository,
);
