import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Plus, Users, Building2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface FloatingActionButtonProps {
  onAddTeam: () => void;
  onAddOrganization: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onAddTeam,
  onAddOrganization,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleAddTeam = () => {
    setIsExpanded(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    onAddTeam();
  };

  const handleAddOrganization = () => {
    setIsExpanded(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    onAddOrganization();
  };

  const teamButtonTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const organizationButtonTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  const mainButtonRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const optionOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      {/* Add Team Option */}
      <Animated.View
        style={[
          styles.optionButton,
          {
            transform: [{ translateY: teamButtonTranslateY }],
            opacity: optionOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.optionButtonInner, styles.teamButton]}
          onPress={handleAddTeam}
          activeOpacity={0.8}
        >
          <Users size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionLabel}>Add Team</Text>
      </Animated.View>

      {/* Add Organization Option */}
      <Animated.View
        style={[
          styles.optionButton,
          {
            transform: [{ translateY: organizationButtonTranslateY }],
            opacity: optionOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.optionButtonInner, styles.organizationButton]}
          onPress={handleAddOrganization}
          activeOpacity={0.8}
        >
          <Building2 size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionLabel}>Add Organization</Text>
      </Animated.View>

      {/* Main FAB */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <Animated.View
          style={{
            transform: [{ rotate: mainButtonRotation }],
          }}
        >
          <Plus size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  optionButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  teamButton: {
    backgroundColor: '#10B981', // Green for teams
  },
  organizationButton: {
    backgroundColor: '#8B5CF6', // Purple for organizations
  },
  optionLabel: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default FloatingActionButton;