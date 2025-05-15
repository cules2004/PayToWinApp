import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GameFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.filterButton, activeFilter === 'ALL' && styles.activeButton]}
        onPress={() => onFilterChange('ALL')}
      >
        <Text style={[styles.filterText, activeFilter === 'ALL' && styles.activeText]}>ALL</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterButton, activeFilter === 'PC' && styles.activeButton]}
        onPress={() => onFilterChange('PC')}
      >
        <Text style={[styles.filterText, activeFilter === 'PC' && styles.activeText]}>PC</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterButton, activeFilter === 'Mobile' && styles.activeButton]}
        onPress={() => onFilterChange('Mobile')}
      >
        <Text style={[styles.filterText, activeFilter === 'Mobile' && styles.activeText]}>Mobile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(139, 156, 182, 0.1)',
    borderWidth: 1,
    borderColor: '#8B9CB6',
  },
  activeButton: {
    backgroundColor: '#1EB1FC',
    borderColor: '#1EB1FC',
  },
  filterText: {
    color: '#8B9CB6',
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
  },
});

export default GameFilter; 