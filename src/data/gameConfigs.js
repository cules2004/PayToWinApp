export const gameConfigs = {
  'valorant': {
    id: 'valorant',
    name: 'Valorant',
    currency: 'VP',
    packages: [
      { id: 1, amount: 475, price: 100000, bonus: 0 },
      { id: 2, amount: 1000, price: 200000, bonus: 50 },
      { id: 3, amount: 2050, price: 400000, bonus: 150 },
      { id: 4, amount: 3650, price: 700000, bonus: 300 },
      { id: 5, amount: 5350, price: 1000000, bonus: 500 },
      { id: 6, amount: 11000, price: 2000000, bonus: 1200 }
    ],
    paymentMethods: ['momo', 'zalopay', 'banking'],
    minAmount: 100000,
    maxAmount: 2000000
  },
  'lol': {
    id: 'lol',
    name: 'League of Legends',
    currency: 'RP',
    packages: [
      { id: 1, amount: 650, price: 100000, bonus: 0 },
      { id: 2, amount: 1380, price: 200000, bonus: 50 },
      { id: 3, amount: 2800, price: 400000, bonus: 150 },
      { id: 4, amount: 5000, price: 700000, bonus: 300 },
      { id: 5, amount: 7200, price: 1000000, bonus: 500 },
      { id: 6, amount: 15000, price: 2000000, bonus: 1200 }
    ],
    paymentMethods: ['momo', 'zalopay', 'banking'],
    minAmount: 100000,
    maxAmount: 2000000
  },
  'mobile-legends': {
    id: 'mobile-legends',
    name: 'Mobile Legends',
    currency: 'Diamonds',
    packages: [
      { id: 1, amount: 86, price: 100000, bonus: 0 },
      { id: 2, amount: 172, price: 200000, bonus: 10 },
      { id: 3, amount: 257, price: 300000, bonus: 20 },
      { id: 4, amount: 429, price: 500000, bonus: 40 },
      { id: 5, amount: 514, price: 600000, bonus: 50 },
      { id: 6, amount: 706, price: 800000, bonus: 70 }
    ],
    paymentMethods: ['momo', 'zalopay', 'banking'],
    minAmount: 100000,
    maxAmount: 2000000
  }
};

export const paymentMethods = {
  momo: {
    id: 'momo',
    name: 'MoMo',
    icon: require('C:/Users/admin/PayToWinApp/assets/Images/MoMoLogo.png'),
    minAmount: 10000,
    maxAmount: 20000000
  },
  zalopay: {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: require('C:/Users/admin/PayToWinApp/assets/Images/ZaloPayLogo.png'),
    minAmount: 10000,
    maxAmount: 20000000
  },
  banking: {
    id: 'banking',
    name: 'Chuyển khoản ngân hàng',
    icon: require('C:/Users/admin/PayToWinApp/assets/Images/BankingLogo.png'),
    minAmount: 100000,
    maxAmount: 20000000
  }
}; 