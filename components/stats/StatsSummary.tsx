import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerStats } from '@/assets/interfaces/stats';
import Colors from '@/constants/Colors';

interface StatsSummaryProps {
  teamTotals: Omit<PlayerStats, 'playerId' | 'playerName' | 'playerNumber'>;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ teamTotals }) => {
  const summaryStats = [
    {
      label: 'Points Per Game',
      value: teamTotals.pointsPerGame.toFixed(1),
      color: '#10B981',
    },
    {
      label: 'Rebounds Per Game',
      value: teamTotals.reboundsPerGame.toFixed(1),
      color: '#F59E0B',
    },
    {
      label: 'Assists Per Game',
      value: teamTotals.assistsPerGame.toFixed(1),
      color: Colors.primary,
    },
    {
      label: 'Field Goal %',
      value: `${teamTotals.fieldGoalPercentage.toFixed(1)}%`,
      color: '#8B5CF6',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Averages</Text>
      <View style={styles.statsGrid}>
        {summaryStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
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
    fontSize: 18,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'center',
  },
});

export default StatsSummary;