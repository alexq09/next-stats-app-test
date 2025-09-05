import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { TeamData } from "@/assets/interfaces/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

interface TeamCardProps {
  team: TeamData;
  onPress: (team: TeamData) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onPress }) => {
  return (
    <Link href={`/team/${team.name}`} asChild>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(team)}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.organization}>{team.organization}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.year}>{team.year}</Text>
              <Text style={styles.separator}>•</Text>
              <Text
                style={[
                  styles.status,
                  { color: team.active ? "#22C55E" : Colors.grey },
                ]}
              >
                {team.active ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          <View style={styles.chevronContainer}>
            <ChevronRight size={24} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  textContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 4,
  },
  organization: {
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  year: {
    fontSize: 16,
    color: Colors.grey,
    fontWeight: "500",
  },
  separator: {
    fontSize: 16,
    color: Colors.grey,
    marginHorizontal: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: "500",
  },
  chevronContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TeamCard;
