import { View, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import teamData from "@/assets/data/teams.json";
import { TeamData } from "@/assets/interfaces/home";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";
import TeamList from "@/components/TeamList";
import { useTeamSearch } from "@/hooks/useTeamSearch";

const Page = () => {
  const teams = useMemo(() => teamData as TeamData[], []);
  const { searchQuery, setSearchQuery, filteredTeams } = useTeamSearch(teams);

  const handleTeamPress = (team: TeamData) => {
    // TODO: Navigate to team details
    console.log('Team pressed:', team.name);
  };

  const handleFilterPress = () => {
    // TODO: Open filter modal
    console.log('Filter pressed');
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

      <TeamList
        teams={filteredTeams}
        onTeamPress={handleTeamPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});

export default Page;
