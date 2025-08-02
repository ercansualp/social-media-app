import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Menu, UserPlus, Grid3x3 as Grid3X3, Bookmark } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 32) / 3 - 2;

const userPosts = [
  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=400&h=400&fit=crop',
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = React.useState('posts');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>your_username</Text>
        <TouchableOpacity>
          <Menu size={24} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=200&h=200&fit=crop' }}
              style={styles.profileImage}
            />
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>128</Text>
                <Text style={styles.statLabel}>gönderi</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>2,547</Text>
                <Text style={styles.statLabel}>takipçi</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>312</Text>
                <Text style={styles.statLabel}>takip</Text>
              </View>
            </View>
          </View>

          <View style={styles.bio}>
            <Text style={styles.displayName}>John Doe</Text>
            <Text style={styles.bioText}>📸 Fotoğraf tutkunu{'\n'}🌍 Dünya gezgini{'\n'}☕️ Kahve aşığı</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Profili Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <UserPlus size={16} color="#000" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Grid3X3 size={20} color={activeTab === 'posts' ? '#000' : '#8E8E8E'} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={20} color={activeTab === 'saved' ? '#000' : '#8E8E8E'} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {userPosts.map((image, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <Image source={{ uri: image }} style={styles.postImage} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 24,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E8E',
    marginTop: 4,
  },
  bio: {
    marginBottom: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  shareButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 2,
  },
  postItem: {
    width: imageSize,
    height: imageSize,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});