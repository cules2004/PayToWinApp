import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuOption from './MenuOption';

const ProfileModal = ({ visible, onClose, email, randomId, onLogout, onManageAccount, onManagePayment, activeTab, navigation }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.profileModal}>
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Ionicons name="close" size={28} color="#9E01B7" />
        </TouchableOpacity>
        <Ionicons name="person-circle" size={48} color="#9E01B7" style={{ marginBottom: 8 }} />
        <Text style={styles.profileName}>{email}</Text>
        <Text style={styles.profileId}>ID: {randomId}</Text>
        <View style={styles.profileMembershipBox}>
          <Ionicons name="medal" size={18} color="#9E01B7" style={{ marginRight: 4 }} />
          <Text style={styles.profileMembershipLabel}>Membership:</Text>
          <Text style={styles.profileMembership}> SILVER</Text>
        </View>
        <MenuOption
          icon="card"
          label="Manage Payment"
          onPress={() => {
            onClose();
            navigation.navigate('PaymentManagement', { email });
          }}
          active={activeTab === 'payment'}
        />
        <MenuOption
          icon="person"
          label="Manage Account"
          onPress={onManageAccount}
          active={activeTab === 'account'}
        />
        <MenuOption
          icon="log-out-outline"
          label="Logout"
          onPress={onLogout}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color: '#181A2A',
  },
  profileId: {
    color: '#888',
    marginBottom: 8,
  },
  profileMembershipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F2FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 16,
  },
  profileMembershipLabel: {
    color: '#181A2A',
    fontWeight: '500',
  },
  profileMembership: {
    color: '#2B2B6F',
    fontWeight: 'bold',
  },
});

export default ProfileModal; 