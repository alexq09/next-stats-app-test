import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SlidersHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface FilterButtonProps {
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SlidersHorizontal size={20} color={Colors.grey} />
      <Text style={styles.text}>Filter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 80,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.dark,
    fontWeight: '500',
  },
});

export default FilterButton;