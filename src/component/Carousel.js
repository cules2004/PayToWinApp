import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 18; // 80% of screen width

// Danh sách 6 ảnh placeholder từ Unsplash
const images = [
  {
    id: "1",
    local: require("../../assets/Images/Carousel1.jpg"),
    logo: require("../../assets/Images/Logo1.jpg"),
  },
  {
    id: "2",
    local: require("../../assets/Images/Carousel2.jpg"),
    logo: require("../../assets/Images/Logo2.jpg"),
  },
  {
    id: "3",
    local: require("../../assets/Images/Carousel3.jpg"),
    logo: require("../../assets/Images/Logo3.jpg"),
  },
  {
    id: "4",
    local: require("../../assets/Images/Carousel4.jpg"),
    logo: require("../../assets/Images/Logo4.jpg"),
  },
  {
    id: "5",
    local: require("../../assets/Images/Carousel5.jpg"),
    logo: require("../../assets/Images/Logo5.jpg"),
  },
  {
    id: "6",
    local: require("../../assets/Images/Carousel6.jpg"),
    logo: require("../../assets/Images/Logo6.jpg"),
  },
];

const Carousel = () => {
  const activeIndexRef = useRef(0);
  const directionRef = useRef(1);
  const [dotIndex, setDotIndex] = useState(0);
  const flatListRef = useRef(null);
  const scaleAnims = useRef(images.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndexRef.current + directionRef.current;
      if (nextIndex < 0) {
        nextIndex = 1;
        directionRef.current = 1;
        // setDirection(1);
      } else if (nextIndex >= images.length) {
        console.log("END");
        nextIndex = images.length - 2;
        directionRef.current = -1;
        // setDirection(-1);
      }
      activeIndexRef.current = nextIndex;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      return () => {
        clearInterval(interval);
      };
    }, 3000);
  }, []);

  // Xử lý khi vuốt để cập nhật chỉ số ảnh hiện tại
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);

    scaleAnims.forEach((anim, _index) => {
      Animated.spring(anim, {
        toValue: index === _index ? 1.2 : 1,
        useNativeDriver: true,
        tension: 70,
        friction: 4,
      }).start();
    });

    setDotIndex(index);
    activeIndexRef.current = index;
    // setActiveIndex(index);
    console.log("SCROLLING");
  };

  // Render mỗi ảnh
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.local} style={styles.image} />
    </View>
  );

  // Updated renderDots function
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.gameBox,
            dotIndex === index && styles.activeGameBox,
            {
              borderColor: dotIndex === index ? "#1EB1FC" : "#8B9CB6",
              transform: [{ scale: scaleAnims[index] }],
              transition: "transform 0.2s ease-in-out",
            },
          ]}
        >
          <Image
            source={item.logo}
            style={styles.gameLogo}
            resizeMode="contain"
          />
        </Animated.View>
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
        onMomentumScrollEnd={onScroll}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        style={styles.flatList}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  flatList: {
    flexGrow: 0,
    alignSelf: "center",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
  },
  image: {
    width: ITEM_WIDTH - 20,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 15,
  },
  gameBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "rgba(139, 156, 182, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  activeGameBox: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(30, 177, 252, 0.15)",
    borderWidth: 3,
    shadowColor: "#1EB1FC",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  gameLogo: {
    width: "100%",
    height: "100%",
  },
});

export default Carousel;
