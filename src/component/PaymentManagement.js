import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { paymentMethods as paymentConfigs } from '../data/gameConfigs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentManagement = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy email từ route params hoặc AsyncStorage
        const session = await AsyncStorage.getItem('currentUser');
        if (session) {
          const { email: storedEmail } = JSON.parse(session);
          setEmail(storedEmail);

          // Lấy lịch sử giao dịch
          const storedTransactions = await AsyncStorage.getItem(`transactions_${storedEmail}`);
          if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            // Đảm bảo mỗi giao dịch có ID duy nhất
            const uniqueTransactions = parsedTransactions.reduce((acc, current) => {
              const x = acc.find(item => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            setTransactions(uniqueTransactions);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Lắng nghe sự kiện khi có giao dịch mới từ màn hình TopUp
  useEffect(() => {
    if (route.params?.newTransaction) {
      const newTransaction = route.params.newTransaction;
      // Kiểm tra xem giao dịch đã tồn tại chưa
      const isDuplicate = transactions.some(t => t.id === newTransaction.id);
      if (!isDuplicate) {
        const updatedTransactions = [newTransaction, ...transactions];
        setTransactions(updatedTransactions);
        
        // Lưu vào AsyncStorage
        AsyncStorage.setItem(`transactions_${email}`, JSON.stringify(updatedTransactions));
      }
    }
  }, [route.params?.newTransaction]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderTransaction = ({ item: transaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionAmount}>{formatCurrency(transaction.amount)}</Text>
      </View>
      <View style={styles.transactionFooter}>
        <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
        <View style={[
          styles.statusBadge,
          transaction.status === 'completed' ? styles.completedBadge : 
          transaction.status === 'pending' ? styles.pendingBadge : styles.failedBadge
        ]}>
          <Text style={[
            styles.statusText,
            transaction.status === 'completed' ? styles.completedText :
            transaction.status === 'pending' ? styles.pendingText : styles.failedText
          ]}>
            {transaction.status === 'completed' ? 'Completed' :
             transaction.status === 'pending' ? 'Processing' : 'Failed'}
          </Text>
        </View>
      </View>
    </View>
  );

  const paymentMethods = [
    {
      ...paymentConfigs.momo,
    },
    {
      ...paymentConfigs.zalopay,
    },
    {
      ...paymentConfigs.banking,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Management</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {paymentMethods.map((method) => (
          <View
            key={method.id}
            style={styles.paymentMethodCard}
          >
            <View style={styles.paymentMethodHeader}>
              <Image source={method.icon} style={styles.paymentIcon} />
              <Text style={styles.paymentMethodTitle}>{method.name}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#A0A0A0" />
            <Text style={styles.emptyStateText}>No transactions yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#181A2A',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: '#23243A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2B2B6F',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionCard: {
    backgroundColor: '#23243A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14E585',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#23243A',
    borderRadius: 12,
  },
  emptyStateText: {
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 16,
  },
  completedBadge: {
    backgroundColor: '#1B4332',
  },
  pendingBadge: {
    backgroundColor: '#2B2B6F',
  },
  failedBadge: {
    backgroundColor: '#4A1B1B',
  },
  completedText: {
    color: '#14E585',
  },
  pendingText: {
    color: '#9E01B7',
  },
  failedText: {
    color: '#FF4D4F',
  },
});

export default PaymentManagement; 