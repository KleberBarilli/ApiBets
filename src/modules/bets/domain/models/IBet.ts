export interface IBet {
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
	created_at: Date;
	updated_at: Date;
	//getAvatarUrl(): string | null;
}
