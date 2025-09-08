import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Game } from '@/assets/interfaces/team';
import GameCard from './GameCard';
import Colors from '@/constants/Colors';

interface GamesListProps {
  games: Game[];
  teamName: string;
  onGamePress: (game: Game) => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, teamName, onGamePress }) => {
  if (games.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent Games</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No games played this season</Text>
        </View>
      </View>
    );
  }

  const renderGame = ({ item }: { item: Game }) => (
    <GameCard game={item} teamName={teamName} onPress={onGamePress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Games</Text>
      <FlatList
        data={games.slice(0, 5)} // Show only recent 5 games
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      {games.length > 5 && (
        <Text style={styles.viewAllText}>View all {games.length} games</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
});

export default GamesList;