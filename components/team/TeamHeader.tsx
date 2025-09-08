import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TeamDetails } from '@/assets/interfaces/team';
import Colors from '@/constants/Colors';

interface TeamHeaderProps {
  team: TeamDetails;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <View style={styles.container}>
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.organization}>{team.organization}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 4,
  },
  organization: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
  },
});

export default TeamHeader;