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
import { X, Building2, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CreateOrganizationModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateOrganization: (name: string) => void;
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  visible,
  onClose,
  onCreateOrganization,
}) => {
  const [organizationName, setOrganizationName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (isSubmitting) return;
    setOrganizationName('');
    onClose();
  };

  const handleSubmit = async () => {
    const trimmedName = organizationName.trim();
    
    if (!trimmedName) {
      Alert.alert('Error', 'Organization name is required');
      return;
    }

    if (trimmedName.length < 2) {
      Alert.alert('Error', 'Organization name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 50) {
      Alert.alert('Error', 'Organization name must be less than 50 characters');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onCreateOrganization(trimmedName);
      setOrganizationName('');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = organizationName.trim().length >= 2;

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
                <Building2 size={24} color={Colors.primary} />
              </View>
              <Text style={styles.modalTitle}>Create Organization</Text>
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
              Create a new organization to group your teams together.
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Organization Name *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  !isFormValid && organizationName.length > 0 && styles.textInputError
                ]}
                value={organizationName}
                onChangeText={setOrganizationName}
                placeholder="Enter organization name"
                placeholderTextColor={Colors.grey}
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                editable={!isSubmitting}
                maxLength={50}
              />
              <Text style={styles.characterCount}>
                {organizationName.length}/50
              </Text>
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
                  <Text style={styles.createButtonText}>Create Organization</Text>
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
  },
  description: {
    fontSize: 14,
    color: Colors.grey,
    lineHeight: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 4,
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

export default CreateOrganizationModal;