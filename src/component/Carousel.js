import { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8; // 80% of screen width

// Danh sách 6 ảnh placeholder từ Unsplash
const images = [
  { id: '1', local: require('../../assets/Images/Carousel1.jpg') },
  { id: '2', local: require('../../assets/Images/Carousel2.jpg') },
  { id: '3', local: require('../../assets/Images/Carousel3.jpg') },
  { id: '4', local: require('../../assets/Images/Carousel4.jpg') },
  { id: '5', local: require('../../assets/Images/Carousel5.jpg') },
  { id: '6', local: require('../../assets/Images/Carousel6.jpg') },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const flatListRef = useRef(null);

  // Auto-reverse logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        let next = prev + direction;
        if (next >= images.length) {
          setDirection(-1);
          next = prev - 1;
        } else if (next < 0) {
          setDirection(1);
          next = prev + 1;
        }
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [direction]);

  // Xử lý khi vuốt để cập nhật chỉ số ảnh hiện tại
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  // Render mỗi ảnh
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.local} style={styles.image} />
    </View>
  );

  // Render dấu chấm (pagination dots)
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: activeIndex === index ? '#1EB1FC' : '#8B9CB6' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        style={styles.flatList}
        getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  flatList: {
    flexGrow: 0,
    alignSelf: 'center',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
  },
  image: {
    width: ITEM_WIDTH - 20,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Carousel;

