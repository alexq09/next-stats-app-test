import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { Users, Undo, ArrowLeftRight, X } from "lucide-react-native";
import Colors from "@/constants/Colors";
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GameAction {
  id: string;
  type: string;
  timestamp: string;
  points?: number;
  team: 'home' | 'away';
}

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
}

interface PendingAction {
  type: string;
  points: number;
}

const GamePage = () => {
  const { id, opponent, team } = useLocalSearchParams<{ 
    id: string; 
    opponent?: string; 
    team?: string; 
  }>();

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [actions, setActions] = useState<GameAction[]>([]);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);


  const currentTeamName = team || "Team";
  const opponentName = opponent || "Opponent";

  const addAction = (actionType: string, points: number = 0) => {
    const newAction: GameAction = {
      id: Date.now().toString(),
      type: actionType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      points,
      team: selectedTeam,
    };

    setActions(prev => [newAction, ...prev]);
    
    if (points > 0) {
      if (selectedTeam === 'home') {
        setHomeScore(prev => prev + points);
      } else {
        setAwayScore(prev => prev + points);
      }
    }
  };

  // Bottom sheet setup
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '90%'], []);

  // Mock roster data - in a real app this would come from your data source
  const rosterPlayers: Player[] = [
    { id: '1', name: 'John Smith', number: 23, position: 'Guard' },
    { id: '2', name: 'Mike Johnson', number: 15, position: 'Forward' },
    { id: '3', name: 'David Wilson', number: 8, position: 'Center' },
    { id: '4', name: 'Chris Brown', number: 32, position: 'Guard' },
    { id: '5', name: 'Alex Davis', number: 11, position: 'Forward' },
    { id: '6', name: 'Ryan Miller', number: 7, position: 'Guard' },
    { id: '7', name: 'Kevin Garcia', number: 21, position: 'Forward' },
    { id: '8', name: 'Tyler Martinez', number: 14, position: 'Center' },
    { id: '9', name: 'Brandon Lee', number: 9, position: 'Guard' },
    { id: '10', name: 'Jordan Taylor', number: 5, position: 'Forward' },
  ];

  const addActionWithPlayer = (actionType: string, player: Player, points: number = 0) => {
    const newAction: GameAction = {
      id: Date.now().toString(),
      type: `${actionType} - ${player.name} (#${player.number})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      points,
      team: selectedTeam,
    };

    setActions(prev => [newAction, ...prev]);
  };

  const undoLastAction = () => {
    if (actions.length === 0) return;
    
    const lastAction = actions[0];
    setActions(prev => prev.slice(1));
    
    if (lastAction.points && lastAction.points > 0) {
      if (lastAction.team === 'home') {
        setHomeScore(prev => Math.max(0, prev - lastAction.points));
      } else {
        setAwayScore(prev => Math.max(0, prev - lastAction.points));
      }
    }
  };

  const toggleTeam = () => {
    setSelectedTeam(prev => prev === 'home' ? 'away' : 'home');
  };

  const handleStatAction = (actionType: string, points: number = 0) => {
    // Only show player selection for home team stat actions (non-scoring)
    if (selectedTeam === 'home' && points === 0) {
      setPendingAction({ type: actionType, points });
      bottomSheetRef.current?.expand();
    } else {
      // For away team or scoring actions, add directly
      addAction(actionType, points);
    }
  };

  const handlePlayerSelect = (player: Player) => {
    if (pendingAction) {
      addActionWithPlayer(pendingAction.type, player, pendingAction.points);
      bottomSheetRef.current?.close();
      setPendingAction(null);
      setSelectedPlayer(null);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setPendingAction(null);
      setSelectedPlayer(null);
    }
  }, []);

  const handleClosePlayerSelection = () => {
    bottomSheetRef.current?.close();
    setPendingAction(null);
    setSelectedPlayer(null);
  };

  const ActionButton = ({ title, onPress, style, textStyle }: {
    title: string;
    onPress: () => void;
    style?: any;
    textStyle?: any;
  }) => (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Text style={[styles.actionButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "Game",
          headerTransparent: false,
          headerBackButtonDisplayMode: "generic",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: true,
        }}
      />
      
      <View style={styles.container}>
        {/* Game Header */}
        <View style={styles.gameHeader}>
          <View style={styles.opponentSection}>
            <Text style={styles.opponentName}>
              {currentTeamName}
            </Text>
          </View>
          
          <View style={styles.scoreSection}>
            <Text style={styles.score}>{homeScore} - {awayScore}</Text>
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          
          <View style={styles.opponentSection}>
            <Text style={styles.opponentName}>
              {opponentName}
            </Text>
          </View>
        </View>

        {/* Team Selection Toggle */}
        <View style={styles.teamToggleContainer}>
          <Text style={styles.teamToggleLabel}>Recording for:</Text>
          <TouchableOpacity 
            style={[
              styles.teamToggleButton,
              selectedTeam === 'home' ? styles.homeTeamSelected : styles.awayTeamSelected
            ]} 
            onPress={toggleTeam}
          >
            <Text style={[
              styles.teamToggleText,
              selectedTeam === 'home' ? styles.homeTeamText : styles.awayTeamText
            ]}>
              {selectedTeam === 'home' ? currentTeamName : opponentName}
            </Text>
            <ArrowLeftRight size={16} color={selectedTeam === 'home' ? '#2196F3' : '#EF4444'} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.rosterButton}>
            <Users size={20} color={Colors.grey} />
            <Text style={styles.rosterButtonText}>Roster</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.undoButton} onPress={undoLastAction}>
            <Undo size={20} color="white" />
            <Text style={styles.undoButtonText}>Undo</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Actions */}
        <View style={styles.recentActionsContainer}>
          <Text style={styles.recentActionsTitle}>Recent Actions</Text>
          <View style={styles.actionsScrollContainer}>
            <ScrollView 
              style={styles.actionsScrollView}
              showsVerticalScrollIndicator={false}
            >
              {actions.length === 0 ? (
                <View style={styles.noActionsContainer}>
                  <Text style={styles.noActionsText}>No actions yet</Text>
                </View>
              ) : (
                actions.map((action) => (
                  <View key={action.id} style={styles.actionItem}>
                    <View style={styles.actionLeft}>
                      <Text style={styles.actionText}>{action.type}</Text>
                      <Text style={styles.actionTeam}>
                        {action.team === 'home' ? currentTeamName : opponentName}
                      </Text>
                    </View>
                    <Text style={styles.actionTime}>{action.timestamp}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>

        {/* Scoring Actions */}
        <View style={styles.actionsGrid}>
          <ActionButton
            title="2pt Make"
            onPress={() => addAction("2pt Make", 2)}
            style={styles.makeButton}
          />
          <ActionButton
            title="3pt Make"
            onPress={() => addAction("3pt Make", 3)}
            style={styles.makeButton}
          />
          <ActionButton
            title="FT Make"
            onPress={() => addAction("FT Make", 1)}
            style={styles.makeButton}
          />
          
          <ActionButton
            title="2pt Miss"
            onPress={() => addAction("2pt Miss")}
            style={styles.missButton}
          />
          <ActionButton
            title="3pt Miss"
            onPress={() => addAction("3pt Miss")}
            style={styles.missButton}
          />
          <ActionButton
            title="FT Miss"
            onPress={() => addAction("FT Miss")}
            style={styles.missButton}
          />
          
          <ActionButton
            title="Off Reb"
            onPress={() => handleStatAction("Offensive Rebound")}
            style={styles.statButton}
          />
          <ActionButton
            title="Def Reb"
            onPress={() => handleStatAction("Defensive Rebound")}
            style={styles.statButton}
          />
          <ActionButton
            title="Assist"
            onPress={() => handleStatAction("Assist")}
            style={styles.statButton}
          />
          
          <ActionButton
            title="Steal"
            onPress={() => handleStatAction("Steal")}
            style={styles.statButton}
          />
          <ActionButton
            title="Block"
            onPress={() => handleStatAction("Block")}
            style={styles.statButton}
          />
          <ActionButton
            title="Foul"
            onPress={() => handleStatAction("Foul")}
            style={styles.statButton}
          />
        </View>

        {/* Native Bottom Sheet for Player Selection */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={true}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>
              Select Player for {pendingAction?.type}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePlayerSelection}
            >
              <X size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <BottomSheetFlatList
            data={rosterPlayers}
            keyExtractor={(item) => item.id}
            renderItem={({ item: player }) => (
              <TouchableOpacity
                style={styles.playerItem}
                onPress={() => handlePlayerSelect(player)}
              >
                <View style={styles.playerNumber}>
                  <Text style={styles.playerNumberText}>#{player.number}</Text>
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerPosition}>{player.position}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.playersListContent}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F8F9FA",
  },
  teamBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
    flex: 1,
    maxWidth: 120,
  },
  teamAbbreviation: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
    textAlign: "center",
  },
  teamUnderline: {
    width: 30,
    height: 3,
    backgroundColor: "#6B7280",
    marginTop: 4,
    borderRadius: 2,
  },
  scoreSection: {
    alignItems: "center",
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 8,
  },
  liveIndicator: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  opponentSection: {
    alignItems: "center",
    flex: 1,
    maxWidth: 120,
  },
  opponentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    textAlign: "center",
    flexWrap: "wrap",
  },
  teamToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#F8F9FA",
  },
  teamToggleLabel: {
    fontSize: 16,
    color: Colors.grey,
    marginRight: 12,
    fontWeight: "500",
  },
  teamToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    gap: 8,
  },
  homeTeamSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  awayTeamSelected: {
    backgroundColor: "#FFEBEE",
    borderColor: "#EF4444",
  },
  teamToggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  homeTeamText: {
    color: "#2196F3",
  },
  awayTeamText: {
    color: "#EF4444",
  },
  actionButtonsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  rosterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  rosterButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.grey,
  },
  undoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366F1",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  undoButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  recentActionsContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    height: 200,
  },
  recentActionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    padding: 16,
    paddingBottom: 8,
  },
  actionsScrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionsScrollView: {
    flex: 1,
  },
  noActionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noActionsText: {
    fontSize: 16,
    color: Colors.grey,
    fontStyle: "italic",
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionLeft: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: "500",
    marginBottom: 2,
  },
  actionTeam: {
    fontSize: 14,
    color: Colors.grey,
    fontStyle: "italic",
  },
  actionTime: {
    fontSize: 14,
    color: Colors.grey,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    width: "31%",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  makeButton: {
    backgroundColor: "#22C55E",
  },
  missButton: {
    backgroundColor: "#EF4444",
  },
  statButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bottomSheetBackground: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: '#9CA3AF',
    width: 40,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  playersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  playerNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playerNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default GamePage;