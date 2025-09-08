import React from "react";
import { View, ScrollView, StyleSheet, Alert, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTeamDetails } from "@/hooks/useTeamDetails";
import SeasonSelector from "@/components/team/SeasonSelector";
import TeamStats from "@/components/team/TeamStats";
import QuickActions from "@/components/team/QuickActions";
import GamesList from "@/components/team/GamesList";
import { Game } from "@/assets/interfaces/team";
import Colors from "@/constants/Colors";

const TeamPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const teamName = Array.isArray(id) ? id[0] : id || "";

  const {
    teamDetails,
    selectedSeason,
    selectedSeasonYear,
    setSelectedSeasonYear,
    availableSeasons,
  } = useTeamDetails(teamName);

  const handleManageRoster = () => {
    Alert.alert("Manage Roster", "Navigate to roster management screen");
  };

  const handleCreateGame = () => {
    Alert.alert("Create Game", "Navigate to create game screen");
  };

  const handleViewSchedule = () => {
    Alert.alert("View Schedule", "Navigate to full schedule screen");
  };

  const handleGamePress = (game: Game) => {
    Alert.alert("Game Details", `View details for game vs ${game.opponent}`);
  };

  if (!teamDetails || !selectedSeason) {
    return (
      <View style={styles.container}>
        {/* Could add a loading state or error message here */}
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: Colors.dark }}
              >
                {teamDetails.name}
              </Text>
              <Text style={{ fontSize: 12, color: Colors.grey }}>
                {teamDetails.organization}
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
        <SeasonSelector
          seasons={availableSeasons}
          selectedSeason={selectedSeasonYear}
          onSeasonChange={setSelectedSeasonYear}
        />

        <View style={styles.content}>
          <TeamStats season={selectedSeason} />

          <QuickActions
            onManageRoster={handleManageRoster}
            onCreateGame={handleCreateGame}
            onViewSchedule={handleViewSchedule}
          />

          <GamesList
            games={selectedSeason.games}
            teamName={teamDetails.name}
            onGamePress={handleGamePress}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    paddingBottom: 20,
  },
});

export default TeamPage;
