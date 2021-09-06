export interface ICreateBet {
	user_bet_id: string;
	event: string;
	bookie: string;
	bet: string;
	stake: number;
	odd: number;
	league: string;
	league_icon: string;
	sport: string;
	tag: string;
	tipster: string;
	status: string;
	result: number;
	notes: string;
	date: Date;
}
