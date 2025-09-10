import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Player } from '@/assets/interfaces/roster';
import PlayerCard from './PlayerCard';
import Colors from '@/constants/Colors';

interface PlayersListProps {
  players: Player[];
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (playerId: string) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ 
  players, 
  onEditPlayer, 
  onDeletePlayer 
}) => {
  if (players.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No Players Added</Text>
        <Text style={styles.emptyText}>
          Start building your roster by adding players to your team.
        </Text>
      </View>
    );
  }

  const renderPlayer = ({ item }: { item: Player }) => (
    <PlayerCard
      player={item}
      onEdit={() => onEditPlayer(item)}
      onDelete={() => onDeletePlayer(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players ({players.length})</Text>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    backgroundColor: 'white',
    marginTop: 12,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default PlayersList;