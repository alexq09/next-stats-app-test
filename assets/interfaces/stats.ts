export interface PlayerStats {
  playerId: string;
  playerName: string;
  playerNumber: string;
  gamesPlayed: number;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  // Calculated stats
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
}

export interface TeamSeasonStats {
  teamId: string;
  teamName: string;
  season: string;
  players: PlayerStats[];
  teamTotals: Omit<PlayerStats, 'playerId' | 'playerName' | 'playerNumber'>;
}

export interface StatCategory {
  key: keyof PlayerStats;
  label: string;
  shortLabel: string;
  format: 'number' | 'percentage' | 'decimal';
  width: number;
}