import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import GradientText from './GradientText';
import GameFilter from './GameFilter';
import GameItem from './GameItem';

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 40) / numColumns;

// Danh sách game mẫu với thông tin platform
const games = [
  { 
    id: '1', 
    title: 'The Witcher 3', 
    description: 'Action RPG với thế giới mở.',
    image: require('../../assets/Images/Logo1.jpg'),
    platform: 'PC',
    price: '$29.99',
    discount: '$39.99'
  },
  { 
    id: '2', 
    title: 'Cyberpunk 2077', 
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/Logo2.jpg'),
    platform: 'PC',
    price: '$49.99'
  },
  { 
    id: '3', 
    title: 'Genshin Impact', 
    description: 'Game phiêu lưu anime miễn phí.',
    image: require('../../assets/Images/Logo3.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },
  { 
    id: '4', 
    title: 'Elden Ring', 
    description: 'RPG thế giới mở đầy thử thách.',
    image: require('../../assets/Images/Logo4.jpg'),
    platform: 'PC',
    price: '$59.99'
  },
  { 
    id: '5', 
    title: 'Minecraft', 
    description: 'Game sandbox sáng tạo.',
    image: require('../../assets/Images/Logo5.jpg'),
    platform: 'PC',
    price: '$26.95'
  },
  { 
    id: '6', 
    title: 'League of Legends', 
    description: 'MOBA chiến thuật đội nhóm.',
    image: require('../../assets/Images/Logo6.jpg'),
    platform: 'PC',
    price: 'Free'
  },
  {
    id: '7',
    title: 'Valorant',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/Logo6.jpg'),
    platform: 'PC',
    price: 'Free'
  },
  {
    id: '8',
    title: 'Area Breakout',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/AreaBreakoutLogo.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },
  {
    id: '9',
    title: 'Wild Rift',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/WildRiftLogo.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },          
  {   
    id: '10',
    title: 'Play Together',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/PlayTogetherLogo.jpg'),
    platform: 'PC',
    price: 'Free'
  },
  {
    id: '11',
    title: 'Teamfight Tactics',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/TeamFightTacticsLogo.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },
  {
    id: '12',
    title: 'League of Runeterra',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/LeagueOfRuneterraLogo.jpg'),
    platform: 'PC',
    price: 'Free'
  },
  {
    id: '13',
    title: 'Top Eleven',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/TopEleventLogo.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },  
  {
    id: '14',
    title: 'Roblox',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/RobloxLogo.jpg'),
    platform: 'Mobile',   
    price: 'Free'
  },
  { 
    id: '15',
    title: 'Pubg',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/PubgLogo.jpg'),
    platform: 'Mobile',
    price: 'Free'
  },
  {
    id: '16',
    title: 'League of Legends',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/LeagueOfLegendLogo.jpg'),
    platform: 'PC',
    price: 'Free'
  },
  {
    id: '17',
    title: 'Valorant',
    description: 'Game bắn súng góc nhìn thứ nhất.',
    image: require('../../assets/Images/ValorantLogo.jpg'), 
    platform: 'PC',
    price: 'Free'
  },
  
];    

const GameList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const initialDisplayCount = 6;

  const filteredGames = useMemo(() => {
    return activeFilter === 'ALL' 
      ? games 
      : games.filter(game => game.platform === activeFilter);
  }, [activeFilter]);

  const displayGames = useMemo(() => {
    const count = Math.min(initialDisplayCount, filteredGames.length);
    return isExpanded ? filteredGames : filteredGames.slice(0, count);
  }, [isExpanded, filteredGames, initialDisplayCount]);

  const toggleExpand = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setIsLoading(false);
    }, 300);
  }, [isExpanded]);

  const handleGamePress = useCallback((game) => {
    console.log('Game pressed:', game.title);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View style={[styles.itemContainer, { width: itemWidth }]}>
      <GameItem 
        game={item} 
        onPress={handleGamePress}
      />
    </View>
  ), [handleGamePress]);

  const keyExtractor = useCallback((item) => item.id, []);

  const ListFooterComponent = useCallback(() => (
    filteredGames.length > initialDisplayCount && (
      <TouchableOpacity 
        style={styles.button} 
        onPress={toggleExpand}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#1EB1FC" />
        ) : (
          <Text style={styles.buttonText}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        )}
      </TouchableOpacity>
    )
  ), [filteredGames.length, isExpanded, isLoading, toggleExpand]);

  return (
    <View style={styles.container}>
      <GradientText text="Popular Games" style={styles.header} />
      <GameFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <FlatList
        data={displayGames}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A2A',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1EB1FC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameList;