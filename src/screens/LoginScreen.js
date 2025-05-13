import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, CheckBox } from 'react-native';
import GradientText from '../component/GradientText';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('GettingStarted')}
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
      <Text style={styles.subtitle}>Login to Your Account</Text>
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
      </View>
      <View style={styles.rememberRow}>
        <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
            {remember && <View style={styles.checkboxDot} />}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || password.length < 6) {
          setError('Login information is incorrect.');
        } else {
          setError('');
          navigation.replace('HomePage', { email });
        }
      }}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      {error ? <Text style={{ color: '#FF4D4F', textAlign: 'center', marginBottom: 8, fontWeight: 'bold' }}>{error}</Text> : null}
      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.orLine} />
      </View>
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('C:/Users/admin/PayToWinApp/assets/Images/Google.png')} style={styles.socialIcon} />
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('C:/Users/admin/PayToWinApp/assets/Images/facebook.png')} style={styles.socialIcon} />
          <Text style={styles.socialLabel}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('C:/Users/admin/PayToWinApp/assets/Images/Github.png')} style={styles.socialIcon} />
          <Text style={styles.socialLabel}>Github</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
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
    fontSize: 20,
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
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#14E585',
    borderRadius: 6,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A2A',
  },
  checkboxChecked: {
    backgroundColor: '#14E585',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#181A2A',
  },
  rememberText: {
    color: '#fff',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#181A2A',
    borderColor: '#14E585',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#393A50',
    marginHorizontal: 8,
  },
  orText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  socialLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  signupText: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontSize: 14,
  },
  signupLink: {
    color: '#14E585',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 