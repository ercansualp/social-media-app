import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { X, Type, Smile, Download, Send } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface StoryCreatorProps {
  visible: boolean;
  onClose: () => void;
  imageUri?: string;
}

export function StoryCreator({ visible, onClose, imageUri }: StoryCreatorProps) {
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: width / 2, y: height / 2 });
  const [showTextInput, setShowTextInput] = useState(false);

  const handleShare = () => {
    // Hikaye paylaşma işlemi burada yapılacak
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hikayene ekle</Text>
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.shareButton}>Paylaş</Text>
          </TouchableOpacity>
        </View>

        {/* Story Canvas */}
        <View style={styles.canvas}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.backgroundImage} />
          )}
          
          {text && (
            <View 
              style={[
                styles.textOverlay,
                { left: textPosition.x - 50, top: textPosition.y - 20 }
              ]}
            >
              <Text style={styles.overlayText}>{text}</Text>
            </View>
          )}
        </View>

        {/* Bottom Tools */}
        <View style={styles.bottomTools}>
          <TouchableOpacity 
            style={styles.tool}
            onPress={() => setShowTextInput(true)}
          >
            <Type size={24} color="#fff" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tool}>
            <Smile size={24} color="#fff" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tool}>
            <Download size={24} color="#fff" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Text Input Modal */}
        <Modal visible={showTextInput} transparent animationType="fade">
          <View style={styles.textInputModal}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Metin ekle..."
                placeholderTextColor="#8E8E8E"
                value={text}
                onChangeText={setText}
                multiline
                autoFocus
              />
              <View style={styles.textInputActions}>
                <TouchableOpacity 
                  onPress={() => setShowTextInput(false)}
                  style={styles.textInputButton}
                >
                  <Text style={styles.textInputButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowTextInput(false)}
                  style={[styles.textInputButton, styles.textInputButtonPrimary]}
                >
                  <Text style={styles.textInputButtonTextPrimary}>Tamam</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    color: '#405DE6',
    fontSize: 16,
    fontWeight: '600',
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomTools: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 32,
  },
  tool: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
  },
  textInputModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: width - 40,
    maxHeight: 200,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  textInputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  textInputButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  textInputButtonPrimary: {
    backgroundColor: '#405DE6',
  },
  textInputButtonText: {
    color: '#8E8E8E',
    fontSize: 14,
    fontWeight: '600',
  },
  textInputButtonTextPrimary: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});