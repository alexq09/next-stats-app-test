import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import Colors from "@/constants/Colors";

const GamePage = () => {
  const { id, opponent, team } = useLocalSearchParams<{ 
    id: string; 
    opponent?: string; 
    team?: string; 
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Game Details",
          headerTransparent: false,
          headerBackButtonDisplayMode: "generic",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: true,
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>New Game Created</Text>
          
          {team && (
            <Text style={styles.teamText}>Team: {team}</Text>
          )}
          
          {opponent && (
            <Text style={styles.opponentText}>vs {opponent}</Text>
          )}
          
          <Text style={styles.gameId}>Game ID: {id}</Text>
          
          <Text style={styles.placeholder}>
            Game details and scoring interface will be implemented here.
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  teamText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  opponentText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 16,
  },
  gameId: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 32,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
export default GamePage;
