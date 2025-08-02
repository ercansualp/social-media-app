import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StoryViewer } from './StoryViewer';

const storiesData = [
  {
    id: '1',
    username: 'Hikayen',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop',
    hasStory: false,
    isOwn: true,
    stories: [],
  },
  {
    id: '2',
    username: 'alex_photo',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    hasStory: true,
    stories: [
      {
        id: 's1',
        image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=600&h=800&fit=crop',
        duration: 5,
      },
      {
        id: 's2',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=800&fit=crop',
        duration: 5,
      },
    ],
  },
  {
    id: '3',
    username: 'sara_travels',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    hasStory: true,
    stories: [
      {
        id: 's3',
        image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=600&h=800&fit=crop',
        duration: 5,
      },
    ],
  },
  {
    id: '4',
    username: 'john_fitness',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=100&h=100&fit=crop',
    hasStory: true,
    stories: [
      {
        id: 's4',
        image: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?w=600&h=800&fit=crop',
        duration: 5,
      },
    ],
  },
  {
    id: '5',
    username: 'marie_art',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop',
    hasStory: true,
    stories: [
      {
        id: 's5',
        image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=600&h=800&fit=crop',
        duration: 5,
      },
    ],
  },
];

export function Stories() {
  const [storyViewerVisible, setStoryViewerVisible] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<any>(null);

  const openStory = (story: any) => {
    if (story.hasStory && story.stories.length > 0) {
      setSelectedStory(story);
      setStoryViewerVisible(true);
    }
  };

  const closeStory = () => {
    setStoryViewerVisible(false);
    setSelectedStory(null);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {storiesData.map((story) => (
            <TouchableOpacity 
              key={story.id} 
              style={styles.storyItem}
              onPress={() => openStory(story)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.avatarContainer,
                story.hasStory && !story.isOwn && styles.storyRing,
                story.isOwn && styles.ownStoryRing,
              ]}>
                <Image source={{ uri: story.avatar }} style={styles.avatar} />
                {story.isOwn && (
                  <View style={styles.addIcon}>
                    <Text style={styles.addIconText}>+</Text>
                  </View>
                )}
              </View>
              <Text style={styles.username} numberOfLines={1}>
                {story.username}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <StoryViewer
        visible={storyViewerVisible}
        onClose={closeStory}
        storyData={selectedStory}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyRing: {
    padding: 2,
    borderRadius: 32,
    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  },
  ownStoryRing: {
    borderWidth: 2,
    borderColor: '#DBDBDB',
    borderRadius: 32,
    padding: 2,
  },
  addIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#405DE6',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  username: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});