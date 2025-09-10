import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface RosterHeaderProps {
  playerCount: number;
  onAddPlayer: () => void;
}

const RosterHeader: React.FC<RosterHeaderProps> = ({ playerCount, onAddPlayer }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={24} color={Colors.primary} />
          <View style={styles.statText}>
            <Text style={styles.statNumber}>{playerCount}</Text>
            <Text style={styles.statLabel}>Total Players</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onAddPlayer}>
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Player</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grey,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RosterHeader;