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
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 12,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.grey,
    fontWeight: '500',
  },
});

export default FilterButton;