import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecurityScreen = ({ navigation }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
 
  const handleChangePassword = () => {
    Alert.alert("Change Password", "Redirecting to password update page.");
  };

  const handleManageDevices = () => {
    Alert.alert("Manage Devices", "Redirecting to device management.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#14E585" />
      </TouchableOpacity>  
      <Text style={styles.title}>Security</Text>

      {/* Security Options */}
      <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
        <Ionicons name="key-outline" size={24} color="#14E585" />
        <Text style={styles.optionText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleManageDevices}>
        <Ionicons name="laptop-outline" size={24} color="#14E585" />
        <Text style={styles.optionText}>Manage Devices</Text>
        <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
      </TouchableOpacity>

      {/* Toggle Security Features */}
      <View style={styles.toggleRow}>
        <Ionicons name="shield-checkmark-outline" size={24} color="#14E585" />
        <Text style={styles.optionText}>Two-Factor Authentication</Text>
        <Switch value={twoFactorAuth} onValueChange={() => setTwoFactorAuth(!twoFactorAuth)} />
      </View>

      <View style={styles.toggleRow}>
        <Ionicons name="timer-outline" size={24} color="#14E585" />
        <Text style={styles.optionText}>Auto Logout</Text>
        <Switch value={autoLogout} onValueChange={() => setAutoLogout(!autoLogout)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    padding: 20,
    top: 30,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#14E585',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23243A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23243A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
});

export default SecurityScreen;