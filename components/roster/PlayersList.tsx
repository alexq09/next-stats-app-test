import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Player } from '@/assets/interfaces/roster';
import PlayerCard from './PlayerCard';
import AddPlayerCard from './AddPlayerCard';
import Colors from '@/constants/Colors';

interface PlayersListProps {
  players: Player[];
  onEditPlayer: (playerId: string, updates: { name: string; number: string }) => void;
  onDeletePlayer: (playerId: string) => void;
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ 
  players, 
  onEditPlayer, 
  onDeletePlayer,
  onAddPlayer
}) => {

  const renderPlayer = ({ item }: { item: Player }) => (
    <PlayerCard
      player={item}
      onEdit={onEditPlayer}
      onDelete={() => onDeletePlayer(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players ({players.length})</Text>
      
      <AddPlayerCard onAddPlayer={onAddPlayer} />
      
      {players.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No players added yet. Use the card above to add your first player.
          </Text>
        </View>
      ) : (
        <FlatList
          data={players}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default PlayersList;