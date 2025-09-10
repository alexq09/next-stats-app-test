import React from "react";
import { View, ScrollView, StyleSheet, Text, Alert } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { useTeamSettings } from "@/hooks/useTeamSettings";
import TeamInfoSection from "@/components/teamSettings/TeamInfoSection";
import SeasonsSection from "@/components/teamSettings/SeasonsSection";

const TeamSettingsPage = () => {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const teamName = Array.isArray(teamId) ? teamId[0] : teamId || "";
  
  const {
    teamSettings,
    organizations,
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
  } = useTeamSettings(teamName);

  const handleDeleteTeamConfirm = () => {
    Alert.alert(
      "Delete Team",
      `Are you sure you want to delete "${teamSettings?.name}"? This action cannot be undone and will remove all seasons, games, and player data.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: handleDeleteTeam
        }
      ]
    );
  };

  const handleDeleteSeasonConfirm = (seasonId: string) => {
    const season = teamSettings?.seasons.find(s => s.id === seasonId);
    if (!season) return;

    Alert.alert(
      "Delete Season",
      `Are you sure you want to delete the ${season.year} season? This will remove all games and statistics for this season.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => handleDeleteSeason(seasonId)
        }
      ]
    );
  };

  if (!teamSettings) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Team not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.dark }}>
                Team Settings
              </Text>
              <Text style={{ fontSize: 12, color: Colors.grey }}>
                {teamSettings.name}
              </Text>
            </View>
          ),
          headerTransparent: false,
          headerBackButtonDisplayMode: "generic",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: true,
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TeamInfoSection
          teamName={teamSettings.name}
          organization={teamSettings.organization}
          organizations={organizations}
          isEditing={isEditing}
          editedName={editedName}
          editedOrganization={editedOrganization}
          onEditedNameChange={setEditedName}
          onEditedOrganizationChange={setEditedOrganization}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDeleteTeam={handleDeleteTeamConfirm}
        />

        <SeasonsSection
          seasons={teamSettings.seasons}
          onEditSeason={handleEditSeason}
          onDeleteSeason={handleDeleteSeasonConfirm}
          onAddSeason={handleAddSeason}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  errorText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default TeamSettingsPage;