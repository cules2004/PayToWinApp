import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
  const sampleData = [
    { id: '1', name: 'Game 1', category: 'Action', price: '$10' },
    { id: '2', name: 'Game 2', category: 'RPG', price: '$15' },
    { id: '3', name: 'Game 3', category: 'Strategy', price: '$20' },
    { id: '4', name: 'Game 4', category: 'Action', price: '$25' },
    { id: '5', name: 'Game 5', category: 'RPG', price: '$30' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search games..."
        containerStyle={styles.searchBarContainer}
      />
      
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  searchBarContainer: {
    marginTop: 16,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#23243A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemCategory: {
    color: '#14E585',
    fontSize: 14,
    marginBottom: 4,
  },
  itemPrice: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  emptyText: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
});

export default SearchScreen; 