import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import GradientText from './GradientText';

// Danh sách game mẫu (10 game)
const games = [
  { 
    id: '1', 
    title: 'The Witcher 3', 
    description: 'Action RPG với thế giới mở.',
    image: require('../../assets/Images/Logo1.jpg')
  },
  { 
    id: '2', 
    title: 'Cyberpunk 2077', 
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/Logo2.jpg')
  },
  { 
    id: '3', 
    title: 'Genshin Impact', 
    description: 'Game phiêu lưu anime miễn phí.',
    image: require('../../assets/Images/Logo3.jpg')
  },
  { 
    id: '4', 
    title: 'Elden Ring', 
    description: 'RPG thế giới mở đầy thử thách.',
    image: require('../../assets/Images/Logo4.jpg')
  },
  { 
    id: '5', 
    title: 'Minecraft', 
    description: 'Game sandbox sáng tạo.',
    image: require('../../assets/Images/Logo5.jpg')
  },
  { 
    id: '6', 
    title: 'League of Legends', 
    description: 'MOBA chiến thuật đội nhóm.',
    image: require('../../assets/Images/Logo6.jpg')
  },
  { id: '7', title: 'Among Us', description: 'Game xã hội tìm kẻ phản bội.' },
  { id: '8', title: 'FIFA 23', description: 'Game bóng đá chân thực.' },
  { id: '9', title: 'God of War', description: 'Hành động phiêu lưu thần thoại.' },
  { id: '10', title: 'Animal Crossing', description: 'Game mô phỏng cuộc sống.' },
];

const GameList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialDisplayCount = 3; // Số game hiển thị ban đầu

  // Dữ liệu hiển thị: toàn bộ hoặc chỉ một phần
  const displayGames = isExpanded ? games : games.slice(0, initialDisplayCount);

  // Xử lý nhấn nút Show More/Show Less
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Render mỗi mục game
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.gameImage} />
      <View style={styles.gameInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <GradientText text="Popular Games" style={styles.header} />
      <View style={styles.listContainer}>
        {displayGames.map((item) => (
          <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
        ))}
      </View>
      {games.length > initialDisplayCount && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleExpand}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A2A',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#23243A',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  gameInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8B9CB6',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#23243A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#1EB1FC',
  },
  buttonText: {
    color: '#1EB1FC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameList;