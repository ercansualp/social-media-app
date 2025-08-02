import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 32) / 3 - 2;

const exploreImages = [
  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=400&h=400&fit=crop',
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={16} color="#8E8E8E" strokeWidth={1.5} />
          <TextInput
            style={styles.searchInput}
            placeholder="Ara"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#8E8E8E"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {exploreImages.map((image, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <Image source={{ uri: image }} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 2,
  },
  gridItem: {
    width: imageSize,
    height: imageSize,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});