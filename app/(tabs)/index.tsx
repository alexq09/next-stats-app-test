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
import CreateTeamModal from "@/components/modals/CreateTeamModal";
import { DATABASE_ID, databases, ORG_TABLE_ID } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";

const Page = () => {
  const teams = useMemo(() => teamData as TeamData[], []);
  const { searchQuery, setSearchQuery, filteredTeams } = useTeamSearch(teams);
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] =
    useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const handleTeamPress = (team: TeamData) => {
    // TODO: Navigate to team details
    console.log("Team pressed:", team.name);
  };

  const handleFilterPress = () => {
    // TODO: Open filter modal
    console.log("Filter pressed");
  };

  const handleAddTeam = () => {
    setShowCreateTeamModal(true);
  };

  const handleAddOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  const handleCreateOrganization = async (name: string) => {
    // TODO: Implement organization creation logic
    console.log("Creating organization:", name);
    try {
      await databases.createRow({
        databaseId: DATABASE_ID,
        tableId: ORG_TABLE_ID,
        rowId: ID.unique(),
        data: {
          name: name,
        },
      });

      Alert.alert(
        "Success",
        `Organization "${name}" has been created successfully!`
      );
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  const handleCloseOrganizationModal = () => {
    setShowCreateOrganizationModal(false);
  };

  const handleCreateTeam = async (teamData: { name: string; organization: string; year: string }) => {
    // TODO: Implement team creation logic
    console.log("Creating team:", teamData);
    Alert.alert(
      "Success",
      `Team "${teamData.name}" has been created successfully!`
    );
  };

  const handleCloseTeamModal = () => {
    setShowCreateTeamModal(false);
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

      <CreateTeamModal
        visible={showCreateTeamModal}
        onClose={handleCloseTeamModal}
        onCreateTeam={handleCreateTeam}
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
