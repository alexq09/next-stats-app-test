import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MoveVertical as MoreVertical } from 'lucide-react-native';
import { Player } from '@/assets/interfaces/roster';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  player: Player;
  onEdit: () => void;
  onDelete: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.playerNumber}>
            <Text style={styles.playerNumberText}>#{player.number}</Text>
          </View>
          
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton} onPress={onEdit}>
          <MoreVertical size={20} color={Colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playerNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
  menuButton: {
    padding: 4,
  },
});

export default PlayerCard;