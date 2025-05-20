import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import SearchBar from '../component/SearchBar';
import ProfileModal from '../component/ProfileModal';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const AccountScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [randomId, setRandomId] = useState('');
  const [email, setEmail] = useState(route?.params?.email || '');
  const [userName, setUserName] = useState('User Name');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchEmailAndName = async () => {
      let currentEmail = '';
      if (route?.params?.email) {
        setEmail(route.params.email);
        currentEmail = route.params.email;
      } else {
        const session = await AsyncStorage.getItem('currentUser');
        if (session) {
          const { email: storedEmail } = JSON.parse(session);
          setEmail(storedEmail);
          currentEmail = storedEmail;
        }
      }
      // Lấy tên user từ personalInfo_{email}
      if (currentEmail) {
        const key = `personalInfo_${currentEmail.toLowerCase()}`;
        const userData = await AsyncStorage.getItem(key);
        if (userData) {
          const info = JSON.parse(userData);
          setUserName(info.name || 'User Name');
        } else {
          setUserName('User Name');
        }
      }
    };
    if (isFocused) fetchEmailAndName();
  }, [route?.params?.email, isFocused]);

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

  const renderSettingItem = (icon, title, value, onPress, isSwitch = false) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#14E585" style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#23243A', true: '#14E585' }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavigationBar
        onProfilePress={() => setShowProfile(true)}
        onLogoPress={() => navigation.replace('HomePage')}
        rightLabel={<Text style={styles.accountLabel}>Account</Text>}
      />
      {/*<SearchBar value={search} onChangeText={setSearch} />*/}
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/Images/default_avatar.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#14E585" />
          </TouchableOpacity>
        </View>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsContainer}>
            {renderSettingItem('person-outline', 'Personal Information', null, () => navigation.navigate('PersonalInfo'))}
            {renderSettingItem('notifications-outline', 'Notifications', notifications, () => setNotifications(!notifications), true)}
            {renderSettingItem('shield-outline', 'Security', null, () => navigation.navigate('SecurityScreen'))}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingItem('moon-outline', 'Dark Mode', darkMode, () => setDarkMode(!darkMode), true)}
          {renderSettingItem('language-outline', 'Language', null, () => {})}
          {renderSettingItem('globe-outline', 'Region', null, () => {})}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem('help-circle-outline', 'Help Center', null, () => {})}
          {renderSettingItem('document-text-outline', 'Terms of Service', null, () => {})}
          {renderSettingItem('shield-checkmark-outline', 'Privacy Policy', null, () => {})}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        email={email}
        randomId={randomId}
        onLogout={handleLogout}
        onManageAccount={() => { setShowProfile(false); navigation.navigate('AccountScreen'); }}
        activeTab="account"
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  scrollView: {
    flex: 1,
  },
  accountLabel: {
    color: '#A0A0A0',
    fontSize: 16,
    marginLeft: 8,
    alignSelf: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23243A',
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#14E585',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#23243A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23243A',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  settingsContainer: {
    // Add appropriate styles for the settings container
  },
});

export default AccountScreen; 