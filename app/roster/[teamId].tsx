import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { X, Plus } from "lucide-react-native";
import Colors from "@/constants/Colors";
import { useRosterData } from "@/hooks/useRosterData";
import RosterHeader from "@/components/roster/RosterHeader";
import PlayersList from "@/components/roster/PlayersList";
import AddPlayerModal from "@/components/roster/AddPlayerModal";
import { Player } from "@/assets/interfaces/roster";

const RosterPage = () => {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const teamName = Array.isArray(teamId) ? teamId[0] : teamId || "";
  
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const { players, addPlayer, removePlayer, updatePlayer } = useRosterData(teamName);

  const handleAddPlayer = (playerData: Omit<Player, 'id'>) => {
    addPlayer(playerData);
    setShowAddPlayerModal(false);
  };

  const handleEditPlayer = (player: Player) => {
    // This is now handled by the PlayerCard component itself
    console.log("Edit player:", player.id);
  };

  const handleUpdatePlayer = (playerId: string, updates: { name: string; number: string }) => {
    updatePlayer(playerId, updates);
  };

  const handleDeletePlayer = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    Alert.alert(
      "Remove Player",
      `Are you sure you want to remove ${player.name} from the roster?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: () => removePlayer(playerId)
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.dark }}>
                Roster Management
              </Text>
              <Text style={{ fontSize: 12, color: Colors.grey }}>
                {teamName}
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
        <RosterHeader 
          playerCount={players.length}
          onAddPlayer={() => setShowAddPlayerModal(true)}
        />

        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <PlayersList
              players={players}
              onEditPlayer={handleUpdatePlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <AddPlayerModal
          visible={showAddPlayerModal}
          onClose={() => setShowAddPlayerModal(false)}
          onSubmit={handleAddPlayer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default RosterPage;