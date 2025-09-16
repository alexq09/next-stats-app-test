import { View, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import teamData from "@/assets/data/teams.json";
import { TeamData } from "@/assets/interfaces/home";
import { Stack } from "expo-router";
import HomeHeader from "@/components/index/HomeHeader";
import SearchBar from "@/components/index/SearchBar";
import FilterButton from "@/components/index/FilterButton";
import TeamList from "@/components/index/TeamList";
import { useTeamSearch } from "@/hooks/useTeamSearch";
import FloatingActionButton from "@/components/index/FloatingActionButton";
import CreateOrganizationModal from "@/components/modals/CreateOrganizationModal";

const Page = () => {
  const teams = useMemo(() => teamData as TeamData[], []);
  const { searchQuery, setSearchQuery, filteredTeams } = useTeamSearch(teams);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);

  const handleTeamPress = (team: TeamData) => {
    // TODO: Navigate to team details
    console.log("Team pressed:", team.name);
  };

  const handleFilterPress = () => {
    // TODO: Open filter modal
    console.log("Filter pressed");
  };

  const handleAddTeam = () => {
    // TODO: Navigate to add team screen
    console.log("Add team pressed");
  };

  const handleAddOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  const handleCreateOrganization = async (name: string) => {
    // TODO: Implement organization creation logic
    console.log("Creating organization:", name);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message or handle the created organization
    Alert.alert("Success", `Organization "${name}" has been created successfully!`);
  };

  const handleCloseOrganizationModal = () => {
    setShowCreateOrganizationModal(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />
        <FilterButton onPress={handleFilterPress} />
      </View>

      <TeamList teams={filteredTeams} onTeamPress={handleTeamPress} />

      <FloatingActionButton
        onAddTeam={handleAddTeam}
        onAddOrganization={handleAddOrganization}
      />

      <CreateOrganizationModal
        visible={showCreateOrganizationModal}
        onClose={handleCloseOrganizationModal}
        onCreateOrganization={handleCreateOrganization}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#F8F9FA",
  },
});

export default Page;
