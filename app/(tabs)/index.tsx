import { View, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import teamData from "@/assets/data/teams.json";
import { TeamData } from "@/assets/interfaces/home";
import { Stack } from "expo-router";
import HomeHeader from "@/components/index/HomeHeader";
import SearchBar from "@/components/index/SearchBar";
import FilterButton from "@/components/index/FilterButton";
import TeamList from "@/components/index/TeamList";
import { useTeamSearch } from "@/hooks/useTeamSearch";
import FloatingActionButton from "@/components/index/FloatingActionButton";

const Page = () => {
  const teams = useMemo(() => teamData as TeamData[], []);
  const { searchQuery, setSearchQuery, filteredTeams } = useTeamSearch(teams);

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
    // TODO: Navigate to add organization screen
    console.log("Add organization pressed");
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
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#F8F9FA",
  },
});

export default Page;
