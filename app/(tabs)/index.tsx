import { View } from "react-native";
import React, { useMemo } from "react";
import teamData from "@/assets/data/teams.json";
import { TeamData } from "@/assets/interfaces/home";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";

const Page = () => {
  const teams = useMemo(() => teamData as TeamData[], []);
  return (
    <View style={{ flex: 1, marginTop: 32 }}>
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </View>
  );
};

export default Page;
