import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../component/GradientText';

const HomePageScreen = () => {
  const [showNav, setShowNav] = useState(true);
  const [search, setSearch] = useState('');
  const lastOffset = useRef(0);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > lastOffset.current && currentOffset > 20) {
      setShowNav(false); // Hide navbar when scrolling down
    } else if (currentOffset < lastOffset.current) {
      setShowNav(true); // Show navbar when scrolling up
    }
    lastOffset.current = currentOffset;
  };

  return (
    <View style={styles.container}>
      {showNav && (
        <SafeAreaView style={styles.navbarContainer}>
          <View style={styles.navbar}>
            <GradientText
              text="PayToWin"
              style={styles.logoText}
              colors={['#14E585', '#9E01B7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            
            <TouchableOpacity style={styles.loginButton}>
              <Ionicons name="person-circle" size={22} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.loginButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search games, items..."
              placeholderTextColor="#A0A0A0"
              value={search}
              onChangeText={setSearch}
            />
            <Ionicons name="search" size={22} color="#A0A0A0" style={styles.searchIcon} />
          </View>
        </SafeAreaView>
      )}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Add your homepage content here */}
        
        {/* ...more content... */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  navbarContainer: {
    backgroundColor: '#181A2A',
    paddingBottom: 8,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A2A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  icon: {
    marginHorizontal: 12,
  },
  loginButton: {
    backgroundColor: '#14E585',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 12,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
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

export default HomePageScreen; 