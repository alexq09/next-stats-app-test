import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface StatsHeaderProps {
  teamName: string;
  season: string;
  totalGames: number;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ teamName, season, totalGames }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <BarChart3 size={24} color={Colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Season Statistics</Text>
        <Text style={styles.subtitle}>{season} Season • {totalGames} Games</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.grey,
  },
});

export default StatsHeader;