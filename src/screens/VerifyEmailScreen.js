import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For edit icon

const VerifyEmailScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const email = route?.params?.email || 'Ismail@gmail.com';
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (text, idx) => {
    if (text.length > 1) text = text.slice(-1);
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);
    if (text && idx < 3) {
      inputs[idx + 1].current.focus();
    }
  };

  const handleVerify = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#14E585', fontSize: 28 }}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Check your inbox</Text>
      <Text style={styles.subtitle}>we have sent you a verification code by email</Text>
      <View style={styles.emailRow}>
        <Text style={styles.emailText}>{email}</Text>
        <TouchableOpacity>
          <Ionicons name="pencil" size={18} color="#9E01B7" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.codeRow}>
        {[0, 1, 2, 3].map((idx) => (
          <TextInput
            key={idx}
            ref={inputs[idx]}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={code[idx]}
            onChangeText={(text) => handleChange(text, idx)}
            returnKeyType="next"
            placeholder=""
            placeholderTextColor="#fff"
          />
        ))}
      </View>
      <TouchableOpacity>
        <Text style={styles.resendText}>Resend again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.verifyButton} activeOpacity={0.8} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verif email</Text>
      </TouchableOpacity>
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Text style={styles.signinLink} onPress={() => navigation.navigate('Login')}>Sign in</Text>
      </Text>
      {showSuccess && (
        <View style={styles.overlay}>
          <View style={styles.checkmarkContainer}>
            <Image
              source={require('../../assets/Images/checkmark.png')}
              style={styles.checkmarkImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.successText}>Verification success</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 18,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  emailText: {
    color: '#9E01B7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  codeInput: {
    width: 56,
    height: 56,
    backgroundColor: '#3D186B',
    borderWidth: 2,
    borderColor: '#FFD600',
    borderRadius: 12,
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  resendText: {
    color: '#9E01B7',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#181A2A',
    borderColor: '#14E585',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signinText: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontSize: 14,
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  signinLink: {
    color: '#14E585',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(24,26,42,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  checkmarkContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 60,
    padding: 24,
    marginBottom: 24,
  },
  checkmarkImage: {
    width: 100,
    height: 100,
  },
  successText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});

export default VerifyEmailScreen; 