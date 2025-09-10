import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Player } from '@/assets/interfaces/roster';

interface AddPlayerModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (player: Omit<Player, 'id'>) => void;
}

const positions = [
  'Point Guard',
  'Shooting Guard',
  'Small Forward',
  'Power Forward',
  'Center',
];

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: positions[0],
    height: '',
    weight: '',
    age: '',
    email: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
      position: positions[0],
      height: '',
      weight: '',
      age: '',
      email: '',
      phone: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Player name is required');
      return;
    }

    if (!formData.number.trim()) {
      Alert.alert('Error', 'Jersey number is required');
      return;
    }

    const playerData: Omit<Player, 'id'> = {
      name: formData.name.trim(),
      number: formData.number.trim(),
      position: formData.position,
      height: formData.height.trim() || undefined,
      weight: formData.weight.trim() || undefined,
      age: formData.age ? parseInt(formData.age) : undefined,
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      emergencyContact: formData.emergencyContactName.trim() ? {
        name: formData.emergencyContactName.trim(),
        phone: formData.emergencyContactPhone.trim(),
        relationship: formData.emergencyContactRelationship.trim(),
      } : undefined,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    };

    onSubmit(playerData);
    resetForm();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Player</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color={Colors.grey} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Basic Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  placeholder="Enter player's full name"
                  placeholderTextColor={Colors.grey}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Jersey Number *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.number}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, number: text }))}
                    placeholder="00"
                    placeholderTextColor={Colors.grey}
                    keyboardType="numeric"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 2, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Position</Text>
                  <View style={styles.positionContainer}>
                    {positions.map((position) => (
                      <TouchableOpacity
                        key={position}
                        style={[
                          styles.positionButton,
                          formData.position === position && styles.selectedPosition,
                        ]}
                        onPress={() => setFormData(prev => ({ ...prev, position }))}
                      >
                        <Text
                          style={[
                            styles.positionText,
                            formData.position === position && styles.selectedPositionText,
                          ]}
                        >
                          {position}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Physical Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Physical Information</Text>
              
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Height</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.height}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, height: text }))}
                    placeholder="6'2\"
                    placeholderTextColor={Colors.grey}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Weight</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.weight}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, weight: text }))}
                    placeholder="180 lbs"
                    placeholderTextColor={Colors.grey}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.age}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
                  placeholder="22"
                  placeholderTextColor={Colors.grey}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  placeholder="player@email.com"
                  placeholderTextColor={Colors.grey}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.phone}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  placeholder="(555) 123-4567"
                  placeholderTextColor={Colors.grey}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Emergency Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.emergencyContactName}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, emergencyContactName: text }))}
                  placeholder="Emergency contact name"
                  placeholderTextColor={Colors.grey}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Contact Phone</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.emergencyContactPhone}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, emergencyContactPhone: text }))}
                    placeholder="(555) 987-6543"
                    placeholderTextColor={Colors.grey}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Relationship</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.emergencyContactRelationship}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, emergencyContactRelationship: text }))}
                    placeholder="Mother, Father, etc."
                    placeholderTextColor={Colors.grey}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Player</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  positionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedPosition: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  positionText: {
    fontSize: 12,
    color: Colors.grey,
    fontWeight: '500',
  },
  selectedPositionText: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default AddPlayerModal;