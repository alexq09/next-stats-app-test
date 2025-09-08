import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { Users, Undo, ArrowLeftRight } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface GameAction {
  id: string;
  type: string;
  timestamp: string;
  points?: number;
  team: 'home' | 'away';
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
    <>
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
            onPress={() => addAction("Offensive Rebound")}
            style={styles.statButton}
          />
          <ActionButton
            title="Def Reb"
            onPress={() => addAction("Defensive Rebound")}
            style={styles.statButton}
          />
          <ActionButton
            title="Assist"
            onPress={() => addAction("Assist")}
            style={styles.statButton}
          />
          
          <ActionButton
            title="Steal"
            onPress={() => addAction("Steal")}
            style={styles.statButton}
          />
          <ActionButton
            title="Block"
            onPress={() => addAction("Block")}
            style={styles.statButton}
          />
          <ActionButton
            title="Foul"
            onPress={() => addAction("Foul")}
            style={styles.statButton}
          />
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
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
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
});

export default GamePage;