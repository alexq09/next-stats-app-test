import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TeamSeason } from '@/assets/interfaces/team';
import Colors from '@/constants/Colors';

interface TeamStatsProps {
  season: TeamSeason;
}

const TeamStats: React.FC<TeamStatsProps> = ({ season }) => {
  const { record, rosterSize } = season;
  const totalGames = record.wins + record.losses + record.ties;
  const winPercentage = totalGames > 0 ? ((record.wins / totalGames) * 100).toFixed(1) : '0.0';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Season Stats</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{record.wins}-{record.losses}-{record.ties}</Text>
          <Text style={styles.statLabel}>Record</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{winPercentage}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{rosterSize}</Text>
          <Text style={styles.statLabel}>Roster Size</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalGames}</Text>
          <Text style={styles.statLabel}>Games Played</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: 'center',
  },
});

export default TeamStats;