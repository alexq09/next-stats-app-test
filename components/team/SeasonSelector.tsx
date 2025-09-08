import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';

interface SeasonSelectorProps {
  seasons: string[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  selectedSeason,
  onSeasonChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Season</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {seasons.map((season) => (
          <TouchableOpacity
            key={season}
            style={[
              styles.seasonButton,
              selectedSeason === season && styles.selectedSeasonButton,
            ]}
            onPress={() => onSeasonChange(season)}
          >
            <Text
              style={[
                styles.seasonText,
                selectedSeason === season && styles.selectedSeasonText,
              ]}
            >
              {season}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 20,
  },
  seasonButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedSeasonButton: {
    backgroundColor: Colors.primary,
  },
  seasonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.grey,
  },
  selectedSeasonText: {
    color: 'white',
  },
});

export default SeasonSelector;