import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Plus, Check, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Player } from '@/assets/interfaces/roster';

interface AddPlayerCardProps {
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
}

const AddPlayerCard: React.FC<AddPlayerCardProps> = ({ onAddPlayer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setName('');
    setNumber('');
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Player name is required');
      return;
    }

    if (!number.trim()) {
      Alert.alert('Error', 'Jersey number is required');
      return;
    }

    const playerData: Omit<Player, 'id'> = {
      name: name.trim(),
      number: number.trim(),
      position: 'Guard', // Default position
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    };

    onAddPlayer(playerData);
    setIsExpanded(false);
    setName('');
    setNumber('');
  };

  if (isExpanded) {
    return (
      <View style={[styles.container, styles.expandedContainer]}>
        <View style={styles.editContent}>
          <View style={styles.editRow}>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Number</Text>
              <TextInput
                style={styles.editInput}
                value={number}
                onChangeText={setNumber}
                placeholder="00"
                placeholderTextColor={Colors.grey}
                keyboardType="numeric"
                maxLength={3}
                autoFocus={true}
              />
            </View>
            
            <View style={[styles.editField, styles.nameField]}>
              <Text style={styles.editLabel}>Name</Text>
              <TextInput
                style={styles.editInput}
                value={name}
                onChangeText={setName}
                placeholder="Player name"
                placeholderTextColor={Colors.grey}
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
            </View>
          </View>
          
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
            >
              <X size={18} color={Colors.grey} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
            >
              <Check size={18} color="white" />
              <Text style={styles.saveButtonText}>Add Player</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleExpand}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.addIcon}>
            <Plus size={24} color={Colors.primary} />
          </View>
          
          <View style={styles.addInfo}>
            <Text style={styles.addText}>Add New Player</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
  },
  expandedContainer: {
    borderColor: Colors.primary,
    borderStyle: 'solid',
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
  addIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  addInfo: {
    flex: 1,
  },
  addText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
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

export default AddPlayerCard;