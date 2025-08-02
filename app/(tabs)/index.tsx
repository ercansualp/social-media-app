import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { Stories } from '@/components/Stories';
import { PostCard } from '@/components/PostCard';

const posts = [
  {
    id: '1',
    username: 'travel_photographer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=600&h=600&fit=crop',
    likes: 1234,
    caption: 'Incredible sunset at Santorini 🌅 #travel #sunset #greece',
    timeAgo: '2 saat önce',
  },
  {
    id: '2',
    username: 'food_lover',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=600&fit=crop',
    likes: 856,
    caption: 'Fresh pasta made from scratch! 🍝 Recipe in my stories',
    timeAgo: '4 saat önce',
  },
  {
    id: '3',
    username: 'urban_explorer',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=600&h=600&fit=crop',
    likes: 2156,
    caption: 'City lights never get old ✨ #citylife #photography #night',
    timeAgo: '6 saat önce',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={24} color="#000" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MessageCircle size={24} color="#000" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Stories />
        
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'serif',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  postsContainer: {
    paddingBottom: 100,
  },
});