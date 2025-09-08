import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Users, Undo2 } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface GameAction {
  id: string;
  type: string;
  timestamp: Date;
  description: string;
}

const GamePage = () => {
  const { id, opponent, team } = useLocalSearchParams<{ 
    id: string; 
    opponent?: string; 
    team?: string; 
  }>();

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [recentActions, setRecentActions] = useState<GameAction[]>([]);

  const handleAction = (actionType: string, points: number = 0) => {
    const newAction: GameAction = {
      id: Date.now().toString(),
      type: actionType,
      timestamp: new Date(),
      description: `${actionType}${points > 0 ? ` (+${points})` : ''}`,
    };

    setRecentActions(prev => [newAction, ...prev.slice(0, 9)]); // Keep last 10 actions

    // Update score for scoring actions
    if (actionType.includes('Make')) {
      setHomeScore(prev => prev + points);
    }
  };

  const handleUndo = () => {
    if (recentActions.length === 0) return;

    const lastAction = recentActions[0];
    
    // Reverse score changes
    if (lastAction.type.includes('Make')) {
      const points = lastAction.type.includes('2pt') ? 2 : 
                    lastAction.type.includes('3pt') ? 3 : 1;
      setHomeScore(prev => Math.max(0, prev - points));
    }

    // Remove the last action
    setRecentActions(prev => prev.slice(1));
  };

  const ActionButton = ({ 
    title, 
    onPress, 
    backgroundColor, 
    textColor = 'white' 
  }: {
    title: string;
    onPress: () => void;
    backgroundColor: string;
    textColor?: string;
  }) => (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.actionButtonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
      
      {/* Game Header */}
      <View style={styles.gameHeader}>
        <View style={styles.teamContainer}>
          <View style={styles.teamBox}>
            <Text style={styles.teamAbbreviation}>WWP</Text>
          </View>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{homeScore} - {awayScore}</Text>
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>
            {opponent || 'Opponent'}
          </Text>
        </View>
      </View>

      {/* Action Buttons Row 1 */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.rosterButton} activeOpacity={0.8}>
          <Users size={20} color={Colors.grey} />
          <Text style={styles.rosterButtonText}>Roster</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.undoButton} 
          onPress={handleUndo}
          activeOpacity={0.8}
        >
          <Undo2 size={20} color="white" />
          <Text style={styles.undoButtonText}>Undo</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Actions */}
      <View style={styles.recentActionsContainer}>
        <Text style={styles.sectionTitle}>Recent Actions</Text>
        <ScrollView 
          style={styles.actionsScrollView}
          showsVerticalScrollIndicator={false}
        >
          {recentActions.length === 0 ? (
            <Text style={styles.noActionsText}>No actions yet</Text>
          ) : (
            recentActions.map((action) => (
              <View key={action.id} style={styles.actionItem}>
                <Text style={styles.actionText}>{action.description}</Text>
                <Text style={styles.actionTime}>
                  {action.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
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
          onPress={() => handleAction('2pt Make', 2)}
          backgroundColor="#22C55E"
        />
        <ActionButton
          title="3pt Make"
          onPress={() => handleAction('3pt Make', 3)}
          backgroundColor="#22C55E"
        />
        <ActionButton
          title="FT Make"
          onPress={() => handleAction('FT Make', 1)}
          backgroundColor="#22C55E"
        />
      </View>

      <View style={styles.actionsGrid}>
        <ActionButton
          title="2pt Miss"
          onPress={() => handleAction('2pt Miss')}
          backgroundColor="#EF4444"
        />
        <ActionButton
          title="3pt Miss"
          onPress={() => handleAction('3pt Miss')}
          backgroundColor="#EF4444"
        />
        <ActionButton
          title="FT Miss"
          onPress={() => handleAction('FT Miss')}
          backgroundColor="#EF4444"
        />
      </View>

      {/* Other Actions */}
      <View style={styles.actionsGrid}>
        <ActionButton
          title="Off Reb"
          onPress={() => handleAction('Off Reb')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
        <ActionButton
          title="Def Reb"
          onPress={() => handleAction('Def Reb')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
        <ActionButton
          title="Assist"
          onPress={() => handleAction('Assist')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
      </View>

      <View style={styles.actionsGrid}>
        <ActionButton
          title="Steal"
          onPress={() => handleAction('Steal')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
        <ActionButton
          title="Block"
          onPress={() => handleAction('Block')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
        <ActionButton
          title="Foul"
          onPress={() => handleAction('Foul')}
          backgroundColor="#F3F4F6"
          textColor={Colors.dark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamBox: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  teamAbbreviation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    textAlign: 'center',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 8,
  },
  liveIndicator: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: 'white',
  },
  rosterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  rosterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  undoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  undoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  recentActionsContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
  actionsScrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  noActionsText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    paddingVertical: 32,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionText: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: '500',
  },
  actionTime: {
    fontSize: 14,
    color: Colors.grey,
  },
  actionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GamePage;