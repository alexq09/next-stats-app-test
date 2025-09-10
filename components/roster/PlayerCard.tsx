import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MoveVertical as MoreVertical, Mail, Phone } from 'lucide-react-native';
import { Player } from '@/assets/interfaces/roster';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  player: Player;
  onEdit: () => void;
  onDelete: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, onDelete }) => {
  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'injured':
        return '#EF4444';
      case 'inactive':
        return '#6B7280';
      default:
        return Colors.grey;
    }
  };

  const getStatusText = (status: Player['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'injured':
        return 'Injured';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  const formatStats = () => {
    if (!player.stats) return null;
    const { points, assists, rebounds, gamesPlayed } = player.stats;
    const ppg = gamesPlayed > 0 ? (points / gamesPlayed).toFixed(1) : '0.0';
    const apg = gamesPlayed > 0 ? (assists / gamesPlayed).toFixed(1) : '0.0';
    const rpg = gamesPlayed > 0 ? (rebounds / gamesPlayed).toFixed(1) : '0.0';
    
    return `${ppg} PPG • ${apg} APG • ${rpg} RPG`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.playerNumber}>
            <Text style={styles.playerNumberText}>#{player.number}</Text>
          </View>
          
          <View style={styles.playerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(player.status) }]}>
                <Text style={styles.statusText}>{getStatusText(player.status)}</Text>
              </View>
            </View>
            
            <Text style={styles.position}>{player.position}</Text>
            
            {player.height && player.weight && (
              <Text style={styles.physicalStats}>
                {player.height} • {player.weight}
                {player.age && ` • ${player.age} years old`}
              </Text>
            )}
            
            {player.stats && (
              <Text style={styles.gameStats}>{formatStats()}</Text>
            )}
            
            <View style={styles.contactInfo}>
              {player.email && (
                <View style={styles.contactItem}>
                  <Mail size={14} color={Colors.grey} />
                  <Text style={styles.contactText}>{player.email}</Text>
                </View>
              )}
              {player.phone && (
                <View style={styles.contactItem}>
                  <Phone size={14} color={Colors.grey} />
                  <Text style={styles.contactText}>{player.phone}</Text>
                </View>
              )}
            </View>
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
    padding: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  position: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  physicalStats: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 4,
  },
  gameStats: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: '500',
    marginBottom: 8,
  },
  contactInfo: {
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 12,
    color: Colors.grey,
  },
  menuButton: {
    padding: 4,
  },
});

export default PlayerCard;