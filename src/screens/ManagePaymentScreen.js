import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import SearchBar from '../component/SearchBar';
import ProfileModal from '../component/ProfileModal';

const ManagePaymentScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [randomId, setRandomId] = useState('');
  const email = route?.params?.email || 'user@email.com';

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

  return (
    <View style={styles.container}>
      <NavigationBar
        onProfilePress={() => setShowProfile(true)}
        onLogoPress={() => navigation.replace('HomePage')}
        rightLabel={<Text style={styles.paymentLabel}>Payment</Text>}
      />
      <SearchBar value={search} onChangeText={setSearch} />
      <View style={styles.content}>
        <Text style={styles.placeholder}>Manage Payment Page Content Here</Text>
      </View>
      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        email={email}
        randomId={randomId}
        onLogout={handleLogout}
        onManageAccount={() => { setShowProfile(false); navigation.navigate('AccountScreen'); }}
        onManagePayment={() => setShowProfile(false)}
        activeTab="payment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  paymentLabel: {
    color: '#A0A0A0',
    fontSize: 16,
    marginLeft: 8,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ManagePaymentScreen; 