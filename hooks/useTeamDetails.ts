import { useState, useMemo } from 'react';
import { TeamDetails, TeamSeason } from '@/assets/interfaces/team';
import teamDetailsData from '@/assets/data/teamDetails.json';

export const useTeamDetails = (teamName: string) => {
  const teamDetails = useMemo(() => {
    const team = (teamDetailsData as TeamDetails[]).find(
      t => t.name.toLowerCase() === teamName.toLowerCase()
    );
    return team || null;
  }, [teamName]);

  const [selectedSeasonYear, setSelectedSeasonYear] = useState<string>(
    teamDetails?.seasons.find(s => s.active)?.year || 
    teamDetails?.seasons[0]?.year || 
    '2024'
  );

  const selectedSeason = useMemo(() => {
    return teamDetails?.seasons.find(s => s.year === selectedSeasonYear) || null;
  }, [teamDetails, selectedSeasonYear]);

  const availableSeasons = useMemo(() => {
    return teamDetails?.seasons.map(s => s.year) || [];
  }, [teamDetails]);

  return {
    teamDetails,
    selectedSeason,
    selectedSeasonYear,
    setSelectedSeasonYear,
    availableSeasons,
  };
};