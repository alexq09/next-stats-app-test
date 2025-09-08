import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TeamDetails } from '@/assets/interfaces/team';
import Colors from '@/constants/Colors';

interface TeamHeaderProps {
  team: TeamDetails;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.organization}>{team.organization}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 24,
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