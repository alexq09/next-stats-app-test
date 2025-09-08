export interface Game {
  id: string;
  opponent: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'completed' | 'scheduled' | 'cancelled';
  location: string;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ties: number;
}

export interface TeamSeason {
  year: string;
  active: boolean;
  record: TeamRecord;
  rosterSize: number;
  games: Game[];
}

export interface TeamDetails {
  id: string;
  name: string;
  organization: string;
  seasons: TeamSeason[];
}