import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StoryTextProps {
  text: string;
  position: { x: number; y: number };
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
}

export function StoryText({ 
  text, 
  position, 
  color = '#fff', 
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  fontSize = 18 
}: StoryTextProps) {
  return (
    <View 
      style={[
        styles.container,
        {
          left: position.x - 50,
          top: position.y - 20,
          backgroundColor,
        }
      ]}
    >
      <Text style={[styles.text, { color, fontSize }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});