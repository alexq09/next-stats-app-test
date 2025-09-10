import React from "react";
import { View, ScrollView, StyleSheet, Alert, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useTeamDetails } from "@/hooks/useTeamDetails";
import SeasonSelector from "@/components/team/SeasonSelector";
import TeamStats from "@/components/team/TeamStats";
import QuickActions from "@/components/team/QuickActions";
import GamesList from "@/components/team/GamesList";
import { Game } from "@/assets/interfaces/team";
import Colors from "@/constants/Colors";
import { X } from "lucide-react-native";

const TeamPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const teamName = Array.isArray(id) ? id[0] : id || "";
  const router = useRouter();
  
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [opponentName, setOpponentName] = useState("");

  const {
    teamDetails,
    selectedSeason,
    selectedSeasonYear,
    setSelectedSeasonYear,
    availableSeasons,
  } = useTeamDetails(teamName);

  const handleManageRoster = () => {
    router.push(`/roster/${encodeURIComponent(teamName)}`);
  };

  const handleCreateGame = () => {
    setShowCreateGameModal(true);
  };

  const handleSubmitGame = () => {
    if (!opponentName.trim()) {
      Alert.alert("Error", "Please enter an opponent name");
      return;
    }
    
    // Generate a temporary game ID
    const gameId = `game-${Date.now()}`;
    
    // Close modal and reset form
    setShowCreateGameModal(false);
    setOpponentName("");
    
    // Navigate to game page
    router.push(`/game/${gameId}?opponent=${encodeURIComponent(opponentName.trim())}&team=${encodeURIComponent(teamName)}`);
  };

  const handleCloseModal = () => {
    setShowCreateGameModal(false);
    setOpponentName("");
  };

  const handleViewSchedule = () => {
    Alert.alert("View Schedule", "Navigate to full schedule screen");
  };

  const handleViewStats = () => {
    router.push(`/stats/${encodeURIComponent(teamName)}`);
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
            onViewStats={handleViewStats}
          />

          <GamesList
            games={selectedSeason.games}
            teamName={teamDetails.name}
            onGamePress={handleGamePress}
          />
        </View>
      </ScrollView>

      {/* Create Game Modal */}
      <Modal
        visible={showCreateGameModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Game</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <X size={24} color={Colors.grey} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Opponent Name</Text>
              <TextInput
                style={styles.textInput}
                value={opponentName}
                onChangeText={setOpponentName}
                placeholder="Enter opponent team name"
                placeholderTextColor={Colors.grey}
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={handleSubmitGame}
              />
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitGame}
              >
                <Text style={styles.submitButtonText}>Create Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark,
    backgroundColor: '#F9FAFB',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default TeamPage;
