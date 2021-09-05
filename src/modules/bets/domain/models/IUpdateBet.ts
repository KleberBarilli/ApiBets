export interface IUpdateBet {
	id: string;
	user_bet_id: string;
	event: string;
	bookie: string;
	bet: string;
	stake: number;
	odd: number;
	sport: string;
	tag: string;
	tipster: string;
	status: string;
	result: number;
	notes: string;
	date: Date;
}
