import AsyncStorage from '@react-native-async-storage/async-storage';

// Xóa tất cả dữ liệu trong AsyncStorage
export const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    return false;
  }
};

// Xóa các key cụ thể trong AsyncStorage
export const clearSpecificAsyncStorage = async () => {
  try {
    const keysToRemove = [
      'users',           // Danh sách người dùng
      'currentUser',     // Thông tin người dùng hiện tại
      'rememberedUser',  // Thông tin đăng nhập được lưu
      'userData'         // Dữ liệu người dùng khác
    ];

    await AsyncStorage.multiRemove(keysToRemove);
    console.log('Specific AsyncStorage data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing specific AsyncStorage data:', error);
    return false;
  }
};

// Xóa thông tin người dùng hiện tại
export const clearCurrentUser = async () => {
  try {
    await AsyncStorage.removeItem('currentUser');
    await AsyncStorage.removeItem('rememberedUser');
    console.log('Current user data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing current user data:', error);
    return false;
  }
}; 