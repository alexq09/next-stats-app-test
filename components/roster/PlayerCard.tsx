import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MoveVertical as MoreVertical, Trash2, Check, X } from 'lucide-react-native';
import { Player } from '@/assets/interfaces/roster';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  player: Player;
  onEdit: (playerId: string, updates: { name: string; number: string }) => void;
  onDelete: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editNumber, setEditNumber] = useState(player.number);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditName(player.name);
    setEditNumber(player.number);
  };

  const handleSaveEdit = () => {
    if (editName.trim() && editNumber.trim()) {
      onEdit(player.id, {
        name: editName.trim(),
        number: editNumber.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(player.name);
    setEditNumber(player.number);
  };

  if (isEditing) {
    return (
      <View style={[styles.container, styles.expandedContainer]}>
        <View style={styles.editContent}>
          <View style={styles.editRow}>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Number</Text>
              <TextInput
                style={styles.editInput}
                value={editNumber}
                onChangeText={setEditNumber}
                placeholder="00"
                placeholderTextColor={Colors.grey}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <View style={[styles.editField, styles.nameField]}>
              <Text style={styles.editLabel}>Name</Text>
              <TextInput
                style={styles.editInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Player name"
                placeholderTextColor={Colors.grey}
              />
            </View>
          </View>
          
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancelEdit}
            >
              <X size={18} color={Colors.grey} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSaveEdit}
            >
              <Check size={18} color="white" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleStartEdit}>
            <MoreVertical size={20} color={Colors.grey} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
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
  expandedContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  editContent: {
    padding: 20,
  },
  editRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  editField: {
    flex: 1,
  },
  nameField: {
    flex: 2,
  },
  editLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.dark,
    backgroundColor: '#F9FAFB',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    gap: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.grey,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    gap: 6,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});

export default PlayerCard;