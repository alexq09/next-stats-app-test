import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Game } from "@/assets/interfaces/team";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

interface GameCardProps {
  game: Game;
  teamName: string;
  onPress: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, teamName, onPress }) => {
  const isHomeGame = game.homeTeam === teamName;
  const teamScore = isHomeGame ? game.homeScore : game.awayScore;
  const opponentScore = isHomeGame ? game.awayScore : game.homeScore;

  const getGameResult = () => {
    if (teamScore > opponentScore) return "W";
    if (teamScore < opponentScore) return "L";
    return "T";
  };

  const getResultColor = () => {
    const result = getGameResult();
    if (result === "W") return "#10B981";
    if (result === "L") return "#EF4444";
    return "#F59E0B";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link href={`/game/${game.id}`} asChild>
      <TouchableOpacity style={styles.container} onPress={() => onPress(game)}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.resultBadge,
                { backgroundColor: getResultColor() },
              ]}
            >
              <Text style={styles.resultText}>{getGameResult()}</Text>
            </View>

            <View style={styles.gameInfo}>
              <Text style={styles.opponent}>vs {game.opponent}</Text>
              <Text style={styles.score}>
                {teamScore} - {opponentScore}
              </Text>
              <View style={styles.gameDetails}>
                <Text style={styles.date}>{formatDate(game.date)}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={12} color={Colors.grey} />
                  <Text style={styles.location}>
                    {isHomeGame ? "Home" : "Away"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ChevronRight size={20} color={Colors.grey} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  resultBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  resultText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  gameInfo: {
    flex: 1,
  },
  opponent: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 2,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  gameDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: Colors.grey,
    marginRight: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: Colors.grey,
    marginLeft: 4,
  },
});

export default GameCard;
