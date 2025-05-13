import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ onNavigate }) => (
  <View style={styles.footer}>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.heading}>Khám phá</Text>
        <TouchableOpacity onPress={() => onNavigate?.('ZingAgent')}>
          <Text style={styles.link}>Đại lý thẻ Zing</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <Text style={styles.heading}>Hỗ Trợ</Text>
        <TouchableOpacity onPress={() => onNavigate?.('Guide')}>
          <Text style={styles.link}>Hướng dẫn nạp tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate?.('FAQ')}>
          <Text style={styles.link}>Câu hỏi thường gặp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate?.('Support')}>
          <Text style={styles.link}>Chăm sóc khách hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.divider} />
    <Text style={styles.copyright}>
      ©Copyright ©2023 VNG. All Rights Reserved
    </Text>
    <View style={styles.bottomRow}>
      <TouchableOpacity onPress={() => onNavigate?.('Terms')}>
        <Text style={styles.bottomLink}>Điều khoản dịch vụ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate?.('Privacy')}>
        <Text style={styles.bottomLink}>Chính sách bảo mật</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#000',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  heading: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  link: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  copyright: {
    color: '#888',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomLink: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Footer; 