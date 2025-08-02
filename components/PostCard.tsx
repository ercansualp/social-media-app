import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  timeAgo: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <TouchableOpacity onPress={handleLike} activeOpacity={0.95}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Heart
              size={24}
              color={isLiked ? '#ED4956' : '#000'}
              fill={isLiked ? '#ED4956' : 'none'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#000" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color="#000" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Bookmark
            size={24}
            color={isSaved ? '#000' : '#000'}
            fill={isSaved ? '#000' : 'none'}
            strokeWidth={1.5}
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <View style={styles.likes}>
        <Text style={styles.likesText}>
          {(post.likes + (isLiked ? 1 : 0)).toLocaleString()} beğeni
        </Text>
      </View>

      {/* Caption */}
      <View style={styles.caption}>
        <Text style={styles.captionText}>
          <Text style={styles.username}>{post.username}</Text> {post.caption}
        </Text>
      </View>

      {/* Time */}
      <Text style={styles.timeAgo}>{post.timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  likes: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  caption: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  captionText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  timeAgo: {
    paddingHorizontal: 16,
    fontSize: 12,
    color: '#8E8E8E',
    marginBottom: 16,
  },
});