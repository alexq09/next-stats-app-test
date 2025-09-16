import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { X, Users, Check, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CreateTeamModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateTeam: (teamData: { name: string; organization: string; year: string }) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  visible,
  onClose,
  onCreateTeam,
}) => {
  const [teamName, setTeamName] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock organizations - in production this would come from your API
  const organizations = [
    'The Boys',
    'Harbor League',
    'Raptors United',
    'Bay League',
    'Cedar Conference',
    'Maplewood Association',
  ];

  // Generate year options (current year and next few years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString());

  const handleClose = () => {
    if (isSubmitting) return;
    setTeamName('');
    setSelectedOrganization('');
    setSelectedYear(currentYear.toString());
    onClose();
  };

  const handleSubmit = async () => {
    const trimmedName = teamName.trim();
    
    if (!trimmedName) {
      Alert.alert('Error', 'Team name is required');
      return;
    }

    if (trimmedName.length < 2) {
      Alert.alert('Error', 'Team name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 50) {
      Alert.alert('Error', 'Team name must be less than 50 characters');
      return;
    }

    if (!selectedOrganization) {
      Alert.alert('Error', 'Please select an organization');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onCreateTeam({
        name: trimmedName,
        organization: selectedOrganization,
        year: selectedYear,
      });
      setTeamName('');
      setSelectedOrganization('');
      setSelectedYear(currentYear.toString());
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = teamName.trim().length >= 2 && selectedOrganization;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Users size={24} color={Colors.primary} />
              </View>
              <Text style={styles.modalTitle}>Create Team</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isSubmitting}
            >
              <X size={24} color={Colors.grey} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.modalBody}>
            <Text style={styles.description}>
              Create a new team to start tracking games and player statistics.
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Team Name *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  !isFormValid && teamName.length > 0 && styles.textInputError
                ]}
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
                placeholderTextColor={Colors.grey}
                autoFocus={true}
                returnKeyType="next"
                editable={!isSubmitting}
                maxLength={50}
              />
              <Text style={styles.characterCount}>
                {teamName.length}/50
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Organization *</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select Organization</Text>
                <View style={styles.organizationGrid}>
                  {organizations.map((org) => (
                    <TouchableOpacity
                      key={org}
                      style={[
                        styles.organizationChip,
                        selectedOrganization === org && styles.selectedOrganizationChip
                      ]}
                      onPress={() => setSelectedOrganization(org)}
                      disabled={isSubmitting}
                    >
                      <Text
                        style={[
                          styles.organizationChipText,
                          selectedOrganization === org && styles.selectedOrganizationChipText
                        ]}
                      >
                        {org}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Season Year</Text>
              <View style={styles.yearGrid}>
                {yearOptions.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.yearChip,
                      selectedYear === year && styles.selectedYearChip
                    ]}
                    onPress={() => setSelectedYear(year)}
                    disabled={isSubmitting}
                  >
                    <Text
                      style={[
                        styles.yearChipText,
                        selectedYear === year && styles.selectedYearChipText
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.createButton,
                (!isFormValid || isSubmitting) && styles.createButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <Text style={styles.createButtonText}>Creating...</Text>
              ) : (
                <>
                  <Check size={18} color="white" />
                  <Text style={styles.createButtonText}>Create Team</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  closeButton: {
    padding: 4,
    borderRadius: 8,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxHeight: 500,
  },
  description: {
    fontSize: 14,
    color: Colors.grey,
    lineHeight: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 8,
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
    marginBottom: 4,
  },
  textInputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  characterCount: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'right',
  },
  pickerContainer: {
    gap: 12,
  },
  pickerLabel: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 8,
  },
  organizationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  organizationChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOrganizationChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  organizationChipText: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: '500',
  },
  selectedOrganizationChipText: {
    color: 'white',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  yearChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 60,
    alignItems: 'center',
  },
  selectedYearChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  yearChipText: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: '500',
  },
  selectedYearChipText: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey,
  },
  createButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CreateTeamModal;