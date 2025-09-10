import { useState, useMemo } from 'react';
import { TeamSettingsData, SeasonSettings, OrganizationOption } from '@/assets/interfaces/teamSettings';
import teamDetailsData from '@/assets/data/teamDetails.json';

// Mock organizations data - in production this would come from your API
const mockOrganizations: OrganizationOption[] = [
  { id: '1', name: 'The Boys' },
  { id: '2', name: 'Harbor League' },
  { id: '3', name: 'Raptors United' },
  { id: '4', name: 'Bay League' },
  { id: '5', name: 'Cedar Conference' },
  { id: '6', name: 'Maplewood Association' },
  { id: '7', name: 'Elite Basketball League' },
  { id: '8', name: 'Metro Sports Association' },
];

const convertToTeamSettings = (teamDetails: any): TeamSettingsData | null => {
  if (!teamDetails) return null;

  const seasons: SeasonSettings[] = teamDetails.seasons.map((season: any) => ({
    id: `${teamDetails.id}-${season.year}`,
    year: season.year,
    active: season.active,
    record: season.record,
    rosterSize: season.rosterSize,
    gamesCount: season.games.length,
    createdDate: '2024-01-01', // Mock date - would come from API
  }));

  return {
    id: teamDetails.id,
    name: teamDetails.name,
    organization: teamDetails.organization,
    seasons,
  };
};

export const useTeamSettings = (teamName: string) => {
  const teamDetails = useMemo(() => {
    const team = (teamDetailsData as any[]).find(
      t => t.name.toLowerCase() === teamName.toLowerCase()
    );
    return convertToTeamSettings(team);
  }, [teamName]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(teamDetails?.name || '');
  const [editedOrganization, setEditedOrganization] = useState(teamDetails?.organization || '');

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditedName(teamDetails?.name || '');
    setEditedOrganization(teamDetails?.organization || '');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(teamDetails?.name || '');
    setEditedOrganization(teamDetails?.organization || '');
  };

  const handleSaveEdit = () => {
    // TODO: Implement save functionality
    console.log('Save team settings:', { name: editedName, organization: editedOrganization });
    setIsEditing(false);
  };

  const handleDeleteTeam = () => {
    // TODO: Implement delete team functionality
    console.log('Delete team:', teamDetails?.name);
  };

  const handleEditSeason = (seasonId: string) => {
    // TODO: Implement edit season functionality
    console.log('Edit season:', seasonId);
  };

  const handleDeleteSeason = (seasonId: string) => {
    // TODO: Implement delete season functionality
    console.log('Delete season:', seasonId);
  };

  const handleAddSeason = () => {
    // TODO: Implement add season functionality
    console.log('Add new season');
  };

  return {
    teamSettings: teamDetails,
    organizations: mockOrganizations,
    isEditing,
    editedName,
    setEditedName,
    editedOrganization,
    setEditedOrganization,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleDeleteTeam,
    handleEditSeason,
    handleDeleteSeason,
    handleAddSeason,
  };
};