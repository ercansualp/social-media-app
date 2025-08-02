import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const activities = [
  {
    id: '1',
    type: 'like',
    user: 'alex_photo',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    action: 'gönderini beğendi',
    time: '2 dk',
    postImage: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    type: 'follow',
    user: 'sara_travels',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    action: 'seni takip etmeye başladı',
    time: '1 saat',
  },
  {
    id: '3',
    type: 'comment',
    user: 'john_fitness',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=100&h=100&fit=crop',
    action: 'gönderine yorum yaptı: "Harika görünüyor!"',
    time: '3 saat',
    postImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    type: 'like',
    user: 'marie_art',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop',
    action: 'gönderini beğendi',
    time: '5 saat',
    postImage: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=100&h=100&fit=crop',
  },
];

export default function ActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aktivite</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bu Hafta</Text>
          
          {activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityItem}>
              <Image source={{ uri: activity.avatar }} style={styles.avatar} />
              
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.username}>{activity.user}</Text>{' '}
                  {activity.action}
                </Text>
                <Text style={styles.timeText}>{activity.time}</Text>
              </View>

              {activity.postImage && (
                <Image source={{ uri: activity.postImage }} style={styles.postThumbnail} />
              )}

              {activity.type === 'follow' && (
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Takip Et</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Önerilen Kişiler</Text>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop' }} 
              style={styles.avatar} 
            />
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionUsername}>design_studio</Text>
              <Text style={styles.suggestionText}>Seni takip ediyor</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Takip Et</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  username: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
  postThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  followButton: {
    backgroundColor: '#405DE6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  suggestionText: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
});