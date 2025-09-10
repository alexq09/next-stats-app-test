import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit3, Save, X, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { OrganizationOption } from '@/assets/interfaces/teamSettings';
import OrganizationPicker from './OrganizationPicker';

interface TeamInfoSectionProps {
  teamName: string;
  organization: string;
  organizations: OrganizationOption[];
  isEditing: boolean;
  editedName: string;
  editedOrganization: string;
  onEditedNameChange: (name: string) => void;
  onEditedOrganizationChange: (organization: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteTeam: () => void;
}

const TeamInfoSection: React.FC<TeamInfoSectionProps> = ({
  teamName,
  organization,
  organizations,
  isEditing,
  editedName,
  editedOrganization,
  onEditedNameChange,
  onEditedOrganizationChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteTeam,
}) => {
  if (isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Team Information</Text>
        
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Team Name</Text>
            <TextInput
              style={styles.textInput}
              value={editedName}
              onChangeText={onEditedNameChange}
              placeholder="Enter team name"
              placeholderTextColor={Colors.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Organization</Text>
            <OrganizationPicker
              organizations={organizations}
              selectedOrganization={editedOrganization}
              onOrganizationChange={onEditedOrganizationChange}
            />
          </View>

          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancelEdit}>
              <X size={18} color={Colors.grey} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={onSaveEdit}>
              <Save size={18} color="white" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Team Information</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Team Name</Text>
          <Text style={styles.infoValue}>{teamName}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Organization</Text>
          <Text style={styles.infoValue}>{organization}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={onStartEdit}>
            <Edit3 size={18} color={Colors.primary} />
            <Text style={styles.editButtonText}>Edit Team Info</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={onDeleteTeam}>
            <Trash2 size={18} color="#EF4444" />
            <Text style={styles.deleteButtonText}>Delete Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
  infoContainer: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.grey,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  editContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark,
    backgroundColor: '#F9FAFB',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.grey,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});

export default TeamInfoSection;