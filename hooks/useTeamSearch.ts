import { useState, useMemo } from 'react';
import { TeamData } from '@/assets/interfaces/home';

export const useTeamSearch = (teams: TeamData[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) {
      return teams;
    }

    const query = searchQuery.toLowerCase();
    return teams.filter(team => 
      team.name.toLowerCase().includes(query) ||
      team.organization.toLowerCase().includes(query) ||
      team.year.includes(query)
    );
  }, [teams, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTeams,
  };
};