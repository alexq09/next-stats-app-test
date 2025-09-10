import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Plus, CreditCard as Edit3, Trash2, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SeasonSettings } from '@/assets/interfaces/teamSettings';

interface SeasonsSectionProps {
  seasons: SeasonSettings[];
  onEditSeason: (seasonId: string) => void;
  onDeleteSeason: (seasonId: string) => void;
  onAddSeason: () => void;
}

const SeasonsSection: React.FC<SeasonsSectionProps> = ({
  seasons,
  onEditSeason,
  onDeleteSeason,
  onAddSeason,
}) => {
  const renderSeasonItem = ({ item }: { item: SeasonSettings }) => (
    <View style={styles.seasonCard}>
      <View style={styles.seasonHeader}>
        <View style={styles.seasonInfo}>
          <View style={styles.seasonTitleRow}>
            <Text style={styles.seasonYear}>{item.year} Season</Text>
            {item.active && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            )}
          </View>
          <Text style={styles.seasonRecord}>
            Record: {item.record.wins}-{item.record.losses}-{item.record.ties}
          </Text>
        </View>
        
        <View style={styles.seasonActions}>
          <TouchableOpacity
            style={styles.editSeasonButton}
            onPress={() => onEditSeason(item.id)}
          >
            <Edit3 size={16} color={Colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.deleteSeasonButton}
            onPress={() => onDeleteSeason(item.id)}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.seasonStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.rosterSize}</Text>
          <Text style={styles.statLabel}>Players</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.gamesCount}</Text>
          <Text style={styles.statLabel}>Games</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {item.record.wins + item.record.losses + item.record.ties > 0
              ? ((item.record.wins / (item.record.wins + item.record.losses + item.record.ties)) * 100).toFixed(1)
              : '0.0'}%
          </Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Seasons ({seasons.length})</Text>
        <TouchableOpacity style={styles.addSeasonButton} onPress={onAddSeason}>
          <Plus size={20} color="white" />
          <Text style={styles.addSeasonButtonText}>Add Season</Text>
        </TouchableOpacity>
      </View>

      {seasons.length === 0 ? (
        <View style={styles.emptyState}>
          <Calendar size={48} color={Colors.grey} />
          <Text style={styles.emptyStateTitle}>No Seasons Yet</Text>
          <Text style={styles.emptyStateText}>
            Add your first season to start tracking team performance
          </Text>
        </View>
      ) : (
        <FlatList
          data={seasons}
          renderItem={renderSeasonItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  addSeasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    gap: 6,
  },
  addSeasonButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  seasonCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  seasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  seasonInfo: {
    flex: 1,
  },
  seasonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  seasonYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginRight: 12,
  },
  activeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  seasonRecord: {
    fontSize: 14,
    color: Colors.grey,
    fontWeight: '500',
  },
  seasonActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editSeasonButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
  },
  deleteSeasonButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  seasonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.grey,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SeasonsSection;