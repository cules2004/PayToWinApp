import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuOption = ({ icon, label, onPress, active, activeColor = '#9E01B7' }) => (
  <TouchableOpacity
    style={[styles.option, active && styles.activeOption]}
    onPress={onPress}
  >
    <Ionicons name={icon} size={20} color={active ? activeColor : '#181A2A'} style={{ marginRight: 8 }} />
    <Text style={[styles.label, active && { color: activeColor, fontWeight: 'bold' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'transparent',
  },
  activeOption: {
    backgroundColor: '#E9D7F7',
    borderRadius: 8,
  },
  label: {
    flex: 1,
    color: '#181A2A',
  },
});

export default MenuOption; 