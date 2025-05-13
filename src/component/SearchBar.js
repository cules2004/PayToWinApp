import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search games, items..."
      placeholderTextColor="#A0A0A0"
      value={value}
      onChangeText={onChangeText}
    />
    <Ionicons name="search" size={22} color="#A0A0A0" style={styles.searchIcon} />
  </View>
);

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23243A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 4,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default SearchBar; 