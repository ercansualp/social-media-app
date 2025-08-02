import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  PanResponder,
  Modal,
} from 'react-native';
import { X, Heart, Send, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Story {
  id: string;
  image: string;
  duration: number;
}

interface StoryData {
  id: string;
  username: string;
  avatar: string;
  stories: Story[];
}

interface StoryViewerProps {
  visible: boolean;
  onClose: () => void;
  storyData: StoryData | null;
  initialStoryIndex?: number;
}

export function StoryViewer({ visible, onClose, storyData, initialStoryIndex = 0 }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible && storyData) {
      startStoryTimer();
    } else {
      stopStoryTimer();
    }

    return () => stopStoryTimer();
  }, [visible, currentStoryIndex, isPaused]);

  const startStoryTimer = () => {
    if (!storyData || isPaused) return;

    const currentStory = storyData.stories[currentStoryIndex];
    if (!currentStory) return;

    progressAnim.setValue(0);
    setProgress(0);

    const duration = currentStory.duration * 1000; // Convert to milliseconds
    const updateInterval = 50; // Update every 50ms for smooth animation
    const increment = (updateInterval / duration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          nextStory();
          return 0;
        }
        return newProgress;
      });
    }, updateInterval);

    Animated.timing(progressAnim, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const stopStoryTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    progressAnim.stopAnimation();
  };

  const nextStory = () => {
    if (!storyData) return;

    if (currentStoryIndex < storyData.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: () => {
      setIsPaused(true);
      stopStoryTimer();
    },
    onPanResponderRelease: (evt) => {
      setIsPaused(false);
      const { locationX } = evt.nativeEvent;
      
      if (locationX < width / 2) {
        previousStory();
      } else {
        nextStory();
      }
    },
  });

  if (!visible || !storyData) {
    return null;
  }

  const currentStory = storyData.stories[currentStoryIndex];

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image source={{ uri: currentStory.image }} style={styles.storyImage} />
        
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Progress Bars */}
        <View style={styles.progressContainer}>
          {storyData.stories.map((_, index) => (
            <View key={index} style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: index === currentStoryIndex 
                      ? `${progress}%` 
                      : index < currentStoryIndex 
                        ? '100%' 
                        : '0%'
                  }
                ]}
              />
            </View>
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: storyData.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{storyData.username}</Text>
            <Text style={styles.timeAgo}>2s</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Touch Areas */}
        <View style={styles.touchAreas} {...panResponder.panHandlers}>
          <TouchableOpacity style={styles.leftTouchArea} onPress={previousStory} />
          <TouchableOpacity style={styles.rightTouchArea} onPress={nextStory} />
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <View style={styles.replyContainer}>
            <Text style={styles.replyPlaceholder}>Mesaj gönder</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={24} color="#fff" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color="#fff" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 8,
    right: 8,
    flexDirection: 'row',
    gap: 2,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
  touchAreas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  leftTouchArea: {
    flex: 1,
  },
  rightTouchArea: {
    flex: 1,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  replyContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  replyPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  actionButton: {
    padding: 8,
  },
});