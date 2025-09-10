import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PlayerStats, StatCategory } from '@/assets/interfaces/stats';
import Colors from '@/constants/Colors';

interface StatsTableProps {
  players: PlayerStats[];
  teamTotals: Omit<PlayerStats, 'playerId' | 'playerName' | 'playerNumber'>;
}

const statCategories: StatCategory[] = [
  { key: 'gamesPlayed', label: 'Games Played', shortLabel: 'GP', format: 'number', width: 50 },
  { key: 'pointsPerGame', label: 'Points Per Game', shortLabel: 'PPG', format: 'decimal', width: 55 },
  { key: 'points', label: 'Total Points', shortLabel: 'PTS', format: 'number', width: 50 },
  { key: 'reboundsPerGame', label: 'Rebounds Per Game', shortLabel: 'RPG', format: 'decimal', width: 55 },
  { key: 'rebounds', label: 'Total Rebounds', shortLabel: 'REB', format: 'number', width: 50 },
  { key: 'assistsPerGame', label: 'Assists Per Game', shortLabel: 'APG', format: 'decimal', width: 55 },
  { key: 'assists', label: 'Total Assists', shortLabel: 'AST', format: 'number', width: 50 },
  { key: 'blocks', label: 'Blocks', shortLabel: 'BLK', format: 'number', width: 50 },
  { key: 'turnovers', label: 'Turnovers', shortLabel: 'TO', format: 'number', width: 45 },
  { key: 'fouls', label: 'Fouls', shortLabel: 'PF', format: 'number', width: 45 },
  { key: 'fieldGoalPercentage', label: 'Field Goal %', shortLabel: 'FG%', format: 'percentage', width: 55 },
  { key: 'threePointPercentage', label: '3-Point %', shortLabel: '3P%', format: 'percentage', width: 55 },
];

const formatStatValue = (value: number, format: StatCategory['format']): string => {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'decimal':
      return value.toFixed(1);
    case 'number':
    default:
      return value.toString();
  }
};

const StatsTable: React.FC<StatsTableProps> = ({ players, teamTotals }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={[styles.playerCell, styles.headerCell]}>
              <Text style={styles.headerText}>Player</Text>
            </View>
            {statCategories.map((category) => (
              <View 
                key={category.key} 
                style={[styles.statCell, styles.headerCell, { width: category.width }]}
              >
                <Text style={styles.headerText}>{category.shortLabel}</Text>
              </View>
            ))}
          </View>

          {/* Player Rows */}
          {players.map((player) => (
            <View key={player.playerId} style={styles.playerRow}>
              <View style={styles.playerCell}>
                <Text style={styles.playerNumber}>#{player.playerNumber}</Text>
                <Text style={styles.playerName}>{player.playerName}</Text>
              </View>
              {statCategories.map((category) => (
                <View 
                  key={category.key} 
                  style={[styles.statCell, { width: category.width }]}
                >
                  <Text style={styles.statText}>
                    {formatStatValue(player[category.key] as number, category.format)}
                  </Text>
                </View>
              ))}
            </View>
          ))}

          {/* Team Totals Row */}
          <View style={[styles.playerRow, styles.totalsRow]}>
            <View style={[styles.playerCell, styles.totalsCell]}>
              <Text style={styles.totalsText}>TEAM TOTALS</Text>
            </View>
            {statCategories.map((category) => (
              <View 
                key={category.key} 
                style={[styles.statCell, styles.totalsCell, { width: category.width }]}
              >
                <Text style={styles.totalsStatText}>
                  {formatStatValue(teamTotals[category.key] as number, category.format)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  table: {
    minWidth: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  playerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  totalsRow: {
    backgroundColor: '#F8F9FA',
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  playerCell: {
    width: 140,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  statCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: '#F8F9FA',
  },
  totalsCell: {
    backgroundColor: '#F8F9FA',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
  },
  playerNumber: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  statText: {
    fontSize: 13,
    color: Colors.dark,
    textAlign: 'center',
  },
  totalsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  totalsStatText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
  },
});

export default StatsTable;