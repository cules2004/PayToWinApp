import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientText from '../component/GradientText';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!');
      setSuccess('');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setSuccess('');
    } else {
      try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUsers = await AsyncStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        
        if (users.some(user => user.email === email)) {
          setError('Email already exists!');
          setSuccess('');
          return;
        }

        // Tạo user mới
        const newUser = {
          email,
          password,
          createdAt: new Date().toISOString(),
          isVerified: false
        };

        // Thêm user mới vào danh sách
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));

        setError('');
        setSuccess('Registration successful! Please verify your email.');
        
        // Chuyển hướng đến màn hình xác thực email
        navigation.navigate('VerifyEmail', { email });
      } catch (error) {
        setError('Failed to register. Please try again.');
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#6C2BD7', fontSize: 28 }}>{'<'}</Text>
      </TouchableOpacity>
      <GradientText
        text="PayToWin"
        style={styles.gradientTitle}
        colors={['#14E585', '#9E01B7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Text style={styles.subtitle}>Create Your Account</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.inputIcon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.inputIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#A0A0A0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={styles.inputIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Show error or success message in the same place */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : success ? (
        <Text style={styles.successText}>{success}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.nextButton}
        activeOpacity={0.8}
        onPress={handleSignUp}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Text style={styles.signinLink} onPress={() => navigation.navigate('Login')}>Sign in</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  gradientTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23243A',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#A0A0A0',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#181A2A',
    borderColor: '#14E585',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signinText: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontSize: 14,
  },
  signinLink: {
    color: '#14E585',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4D4F',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  successText: {
    color: '#14E585',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default SignUpScreen; 