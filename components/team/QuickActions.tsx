import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Users, Plus, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface QuickActionsProps {
  onManageRoster: () => void;
  onCreateGame: () => void;
  onViewSchedule: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onManageRoster,
  onCreateGame,
  onViewSchedule,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionButton} onPress={onManageRoster}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B981' }]}>
            <Users size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Manage Roster</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onCreateGame}>
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary }]}>
            <Plus size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Create Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onViewSchedule}>
          <View style={[styles.iconContainer, { backgroundColor: '#F59E0B' }]}>
            <Calendar size={24} color="white" />
          </View>
          <Text style={styles.actionText}>View Schedule</Text>
        </TouchableOpacity>
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
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark,
    textAlign: 'center',
  },
});

export default QuickActions;