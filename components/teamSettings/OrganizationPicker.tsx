import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { OrganizationOption } from '@/assets/interfaces/teamSettings';

interface OrganizationPickerProps {
  organizations: OrganizationOption[];
  selectedOrganization: string;
  onOrganizationChange: (organization: string) => void;
}

const OrganizationPicker: React.FC<OrganizationPickerProps> = ({
  organizations,
  selectedOrganization,
  onOrganizationChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectOrganization = (organizationName: string) => {
    onOrganizationChange(organizationName);
    setIsModalVisible(false);
  };

  const renderOrganizationItem = ({ item }: { item: OrganizationOption }) => (
    <TouchableOpacity
      style={styles.organizationItem}
      onPress={() => handleSelectOrganization(item.name)}
    >
      <Text style={styles.organizationName}>{item.name}</Text>
      {selectedOrganization === item.name && (
        <Check size={20} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedOrganization || 'Select Organization'}
        </Text>
        <ChevronDown size={20} color={Colors.grey} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Organization</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={organizations}
              renderItem={renderOrganizationItem}
              keyExtractor={(item) => item.id}
              style={styles.organizationList}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  pickerText: {
    fontSize: 16,
    color: Colors.dark,
  },
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
    maxHeight: '70%',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  organizationList: {
    maxHeight: 300,
  },
  organizationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  organizationName: {
    fontSize: 16,
    color: Colors.dark,
  },
});

export default OrganizationPicker;