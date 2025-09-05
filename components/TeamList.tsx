import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { TeamData } from '@/assets/interfaces/home';
import TeamCard from './TeamCard';

interface TeamListProps {
  teams: TeamData[];
  onTeamPress: (team: TeamData) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onTeamPress }) => {
  const renderTeam: ListRenderItem<TeamData> = ({ item }) => (
    <TeamCard team={item} onPress={onTeamPress} />
  );

  return (
    <FlatList
      data={teams}
      renderItem={renderTeam}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default TeamList;