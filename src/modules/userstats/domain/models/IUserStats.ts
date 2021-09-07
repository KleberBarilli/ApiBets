export interface IUserStats {
	id: string;
	username: string;
	total_bets: number;
	total_stake: number;
	profit: number;
	avg_odds: number;
	roi: number;
	created_at: Date;
	updated_at: Date;
}
