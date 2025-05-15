import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Dimensions, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../component/GradientText';
import ProfileModal from '../component/ProfileModal';
import NavigationBar from '../component/NavigationBar';
import SearchBar from '../component/SearchBar';
import Carousel from '../component/Carousel';
import GameList from '../component/GameList';

const HomePageScreen = ({ route, navigation }) => {
  const [showNav, setShowNav] = useState(true);
  const [search, setSearch] = useState('');
  const lastOffset = useRef(0);
  const screenWidth = useRef(Dimensions.get('window').width).current;
  const [showProfile, setShowProfile] = useState(false);
  const email = route?.params?.email || 'user@email.com';
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    // Generate a random 16-character alphanumeric ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomId(id);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
            setShowProfile(false);
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.featureTitle}>Featured</Text>
      <Carousel />
      <View style={styles.gameListContainer}>
        <GameList />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        stickyHeaderIndices={[0, 1]}
      >
        <NavigationBar onProfilePress={() => setShowProfile(true)} onLogoPress={() => navigation.replace('HomePage')} />
        <SearchBar value={search} onChangeText={setSearch} />
        <Text style={styles.featureTitle}>Featured</Text>
        <Carousel />
        <View style={styles.gameListContainer}>
          <GameList />
        </View>
      </ScrollView>
      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        email={email}
        randomId={randomId}
        onLogout={handleLogout}
        onManageAccount={() => { setShowProfile(false); navigation.navigate('AccountScreen'); }}
        onManagePayment={() => { setShowProfile(false); navigation.navigate('ManagePaymentScreen'); }}
        activeTab={navigation?.getState?.()?.routes?.[navigation.getState().index]?.name === 'AccountScreen' ? 'account' :
                  navigation?.getState?.()?.routes?.[navigation.getState().index]?.name === 'ManagePaymentScreen' ? 'payment' : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    position: 'relative',
  },
  flatListContent: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 8,
    color: '#fff',
  },
  gameListContainer: {
    marginTop: 20,
  },
});

export default HomePageScreen; 