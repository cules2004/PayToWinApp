import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import GradientText from './GradientText';
import GameFilter from './GameFilter';
import GameItem from './GameItem';
import { games } from '../data/games';

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 40) / numColumns;

const GameList = ({ searchQuery = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const initialDisplayCount = 6;

  const filteredGames = useMemo(() => {
    let filtered = games;
    
    // Apply platform filter
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter(game => game.platform === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [activeFilter, searchQuery]);

  const displayGames = useMemo(() => {
    const count = Math.min(initialDisplayCount, filteredGames.length);
    return isExpanded ? filteredGames : filteredGames.slice(0, count);
  }, [isExpanded, filteredGames, initialDisplayCount]);

  const toggleExpand = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setIsLoading(false);
    }, 300);
  }, [isExpanded]);

  const handleGamePress = useCallback((game) => {
    console.log('Game pressed:', game.title);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View style={[styles.itemContainer, { width: itemWidth }]}>
      <GameItem 
        game={item} 
        onPress={handleGamePress}
      />
    </View>
  ), [handleGamePress]);

  const keyExtractor = useCallback((item) => item.id, []);

  const ListFooterComponent = useCallback(() => (
    filteredGames.length > initialDisplayCount && (
      <TouchableOpacity 
        style={styles.button} 
        onPress={toggleExpand}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#1EB1FC" />
        ) : (
          <Text style={styles.buttonText}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        )}
      </TouchableOpacity>
    )
  ), [filteredGames.length, isExpanded, isLoading, toggleExpand]);

  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No games found</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <GradientText text="Popular Games" style={styles.header} />
      <GameFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <FlatList
        data={displayGames}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A2A',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#23243A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#1EB1FC',
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1EB1FC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
});

export default GameList;