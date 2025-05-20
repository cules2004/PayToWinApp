import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const PersonalInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const prevEmailRef = useRef('');

  useEffect(() => {
    const fetchInfo = async () => {
      let currentEmail = '';
      const session = await AsyncStorage.getItem('currentUser');
      if (session) {
        const { email: storedEmail } = JSON.parse(session);
        currentEmail = storedEmail;
        setEmail(storedEmail);
      }
      if (currentEmail) {
        const key = `personalInfo_${currentEmail.toLowerCase()}`;
        const userData = await AsyncStorage.getItem(key);
        if (userData) {
          const info = JSON.parse(userData);
          setName(info.name || '');
          setEmail(info.email || '');
          setPhone(info.phone || '');
          setDob(info.dob || '');
        }
        prevEmailRef.current = currentEmail;
      }
    };
    fetchInfo();
  }, []);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Name and Email are required!');
      return;
    }
    setLoading(true);
    const info = { name, email, phone, dob };
    const newKey = `personalInfo_${email.toLowerCase()}`;
    // Nếu đổi email, xóa key cũ
    if (prevEmailRef.current && prevEmailRef.current.toLowerCase() !== email.toLowerCase()) {
      const oldKey = `personalInfo_${prevEmailRef.current.toLowerCase()}`;
      await AsyncStorage.removeItem(oldKey);
    }
    await AsyncStorage.setItem(newKey, JSON.stringify(info));
    // Nếu đổi email, cập nhật luôn currentUser
    const session = await AsyncStorage.getItem('currentUser');
    if (session) {
      const sessionObj = JSON.parse(session);
      if (sessionObj.email !== email) {
        sessionObj.email = email;
        await AsyncStorage.setItem('currentUser', JSON.stringify(sessionObj));
      }
    }
    prevEmailRef.current = email;
    setLoading(false);
    Alert.alert('Success', 'Personal information updated!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#14E585" />
      </TouchableOpacity>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#23243A', color: '#A0A0A0' }]}
          value={email}
          editable={false}
          placeholder="Enter your email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          placeholderTextColor="#A0A0A0"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <TouchableOpacity
        style={[styles.saveButton, loading && { opacity: 0.6 }]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#181A2A',
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#14E585',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#23243A',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#14E585',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PersonalInfoScreen; 