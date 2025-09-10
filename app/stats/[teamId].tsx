import React from "react";
import { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { useSeasonStats } from "@/hooks/useSeasonStats";
import StatsHeader from "@/components/stats/StatsHeader";
import StatsSummary from "@/components/stats/StatsSummary";
import StatsTable from "@/components/stats/StatsTable";

const StatsPage = () => {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const teamName = Array.isArray(teamId) ? teamId[0] : teamId || "";
  const [showTotals, setShowTotals] = useState(true);
  
  const { seasonStats } = useSeasonStats(teamName);

  const handleToggleView = () => {
    setShowTotals(!showTotals);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.dark }}>
                Season Statistics
              </Text>
              <Text style={{ fontSize: 12, color: Colors.grey }}>
                {seasonStats.teamName}
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

      <View style={styles.container}>
        <StatsHeader 
          teamName={seasonStats.teamName}
          season={seasonStats.season}
          totalGames={seasonStats.teamTotals.gamesPlayed}
        />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <StatsSummary teamTotals={seasonStats.teamTotals} />
          
          <StatsTable 
            players={seasonStats.players}
            teamTotals={seasonStats.teamTotals}
            showTotals={showTotals}
            onToggleView={handleToggleView}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
});

export default StatsPage;