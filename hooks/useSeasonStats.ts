import { useState, useMemo } from 'react';
import { PlayerStats, TeamSeasonStats } from '@/assets/interfaces/stats';

// Mock data generator for season stats
const generateMockSeasonStats = (teamName: string): TeamSeasonStats => {
  const mockPlayers: PlayerStats[] = [
    {
      playerId: '1',
      playerName: 'John Smith',
      playerNumber: '23',
      gamesPlayed: 15,
      points: 245,
      rebounds: 67,
      assists: 89,
      blocks: 12,
      turnovers: 34,
      fouls: 28,
      fieldGoalsMade: 98,
      fieldGoalsAttempted: 210,
      threePointersMade: 23,
      threePointersAttempted: 67,
      freeThrowsMade: 26,
      freeThrowsAttempted: 32,
      fieldGoalPercentage: 46.7,
      threePointPercentage: 34.3,
      freeThrowPercentage: 81.3,
      pointsPerGame: 16.3,
      reboundsPerGame: 4.5,
      assistsPerGame: 5.9,
    },
    {
      playerId: '2',
      playerName: 'Mike Johnson',
      playerNumber: '15',
      gamesPlayed: 14,
      points: 198,
      rebounds: 78,
      assists: 45,
      blocks: 8,
      turnovers: 29,
      fouls: 31,
      fieldGoalsMade: 76,
      fieldGoalsAttempted: 165,
      threePointersMade: 18,
      threePointersAttempted: 52,
      freeThrowsMade: 28,
      freeThrowsAttempted: 35,
      fieldGoalPercentage: 46.1,
      threePointPercentage: 34.6,
      freeThrowPercentage: 80.0,
      pointsPerGame: 14.1,
      reboundsPerGame: 5.6,
      assistsPerGame: 3.2,
    },
    {
      playerId: '3',
      playerName: 'David Brown',
      playerNumber: '32',
      gamesPlayed: 16,
      points: 312,
      rebounds: 134,
      assists: 67,
      blocks: 23,
      turnovers: 41,
      fouls: 38,
      fieldGoalsMade: 125,
      fieldGoalsAttempted: 245,
      threePointersMade: 15,
      threePointersAttempted: 43,
      freeThrowsMade: 47,
      freeThrowsAttempted: 58,
      fieldGoalPercentage: 51.0,
      threePointPercentage: 34.9,
      freeThrowPercentage: 81.0,
      pointsPerGame: 19.5,
      reboundsPerGame: 8.4,
      assistsPerGame: 4.2,
    },
    {
      playerId: '4',
      playerName: 'Chris Wilson',
      playerNumber: '8',
      gamesPlayed: 15,
      points: 189,
      rebounds: 156,
      assists: 23,
      blocks: 34,
      turnovers: 22,
      fouls: 45,
      fieldGoalsMade: 78,
      fieldGoalsAttempted: 142,
      threePointersMade: 3,
      threePointersAttempted: 12,
      freeThrowsMade: 30,
      freeThrowsAttempted: 42,
      fieldGoalPercentage: 54.9,
      threePointPercentage: 25.0,
      freeThrowPercentage: 71.4,
      pointsPerGame: 12.6,
      reboundsPerGame: 10.4,
      assistsPerGame: 1.5,
    },
    {
      playerId: '5',
      playerName: 'Robert Davis',
      playerNumber: '21',
      gamesPlayed: 13,
      points: 167,
      rebounds: 189,
      assists: 15,
      blocks: 41,
      turnovers: 18,
      fouls: 39,
      fieldGoalsMade: 71,
      fieldGoalsAttempted: 125,
      threePointersMade: 0,
      threePointersAttempted: 2,
      freeThrowsMade: 25,
      freeThrowsAttempted: 38,
      fieldGoalPercentage: 56.8,
      threePointPercentage: 0.0,
      freeThrowPercentage: 65.8,
      pointsPerGame: 12.8,
      reboundsPerGame: 14.5,
      assistsPerGame: 1.2,
    },
  ];

  // Calculate team totals
  const teamTotals = mockPlayers.reduce((totals, player) => ({
    gamesPlayed: Math.max(totals.gamesPlayed, player.gamesPlayed),
    points: totals.points + player.points,
    rebounds: totals.rebounds + player.rebounds,
    assists: totals.assists + player.assists,
    blocks: totals.blocks + player.blocks,
    turnovers: totals.turnovers + player.turnovers,
    fouls: totals.fouls + player.fouls,
    fieldGoalsMade: totals.fieldGoalsMade + player.fieldGoalsMade,
    fieldGoalsAttempted: totals.fieldGoalsAttempted + player.fieldGoalsAttempted,
    threePointersMade: totals.threePointersMade + player.threePointersMade,
    threePointersAttempted: totals.threePointersAttempted + player.threePointersAttempted,
    freeThrowsMade: totals.freeThrowsMade + player.freeThrowsMade,
    freeThrowsAttempted: totals.freeThrowsAttempted + player.freeThrowsAttempted,
    fieldGoalPercentage: 0,
    threePointPercentage: 0,
    freeThrowPercentage: 0,
    pointsPerGame: 0,
    reboundsPerGame: 0,
    assistsPerGame: 0,
  }), {
    gamesPlayed: 0,
    points: 0,
    rebounds: 0,
    assists: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    threePointersMade: 0,
    threePointersAttempted: 0,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    fieldGoalPercentage: 0,
    threePointPercentage: 0,
    freeThrowPercentage: 0,
    pointsPerGame: 0,
    reboundsPerGame: 0,
    assistsPerGame: 0,
  });

  // Calculate team percentages
  teamTotals.fieldGoalPercentage = teamTotals.fieldGoalsAttempted > 0 
    ? Number(((teamTotals.fieldGoalsMade / teamTotals.fieldGoalsAttempted) * 100).toFixed(1))
    : 0;
  teamTotals.threePointPercentage = teamTotals.threePointersAttempted > 0
    ? Number(((teamTotals.threePointersMade / teamTotals.threePointersAttempted) * 100).toFixed(1))
    : 0;
  teamTotals.freeThrowPercentage = teamTotals.freeThrowsAttempted > 0
    ? Number(((teamTotals.freeThrowsMade / teamTotals.freeThrowsAttempted) * 100).toFixed(1))
    : 0;
  teamTotals.pointsPerGame = teamTotals.gamesPlayed > 0
    ? Number((teamTotals.points / teamTotals.gamesPlayed).toFixed(1))
    : 0;
  teamTotals.reboundsPerGame = teamTotals.gamesPlayed > 0
    ? Number((teamTotals.rebounds / teamTotals.gamesPlayed).toFixed(1))
    : 0;
  teamTotals.assistsPerGame = teamTotals.gamesPlayed > 0
    ? Number((teamTotals.assists / teamTotals.gamesPlayed).toFixed(1))
    : 0;

  return {
    teamId: teamName.toLowerCase().replace(/\s+/g, '-'),
    teamName,
    season: '2024',
    players: mockPlayers,
    teamTotals,
  };
};

export const useSeasonStats = (teamName: string) => {
  const [seasonStats] = useState<TeamSeasonStats>(() => generateMockSeasonStats(teamName));

  const sortedPlayers = useMemo(() => {
    return [...seasonStats.players].sort((a, b) => b.pointsPerGame - a.pointsPerGame);
  }, [seasonStats.players]);

  return {
    seasonStats: {
      ...seasonStats,
      players: sortedPlayers,
    },
  };
};