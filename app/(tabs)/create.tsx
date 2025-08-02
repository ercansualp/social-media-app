import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, RotateCcw, Zap, ZapOff } from 'lucide-react-native';
import { StoryCreator } from '@/components/StoryCreator';

export default function CreateScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showStoryCreator, setShowStoryCreator] = useState(false);

  if (!permission) {
    return <View style={styles.permissionContainer} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <Text style={styles.permissionTitle}>Kameraya Erişim</Text>
          <Text style={styles.permissionText}>
            Fotoğraf çekebilmek için kamera iznine ihtiyacımız var
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>İzin Ver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => !current);
  };

  const takePicture = () => {
    // Demo için örnek bir fotoğraf kullanıyoruz
    const demoImage = 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=600&h=800&fit=crop';
    setCapturedImage(demoImage);
    setShowStoryCreator(true);
  };

  const closeStoryCreator = () => {
    setShowStoryCreator(false);
    setCapturedImage(null);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
          flash={flash ? 'on' : 'off'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton}>
              <X size={24} color="#fff" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={toggleFlash}>
              {flash ? (
                <Zap size={24} color="#fff" strokeWidth={2} />
              ) : (
                <ZapOff size={24} color="#fff" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>

          {/* Camera Controls */}
          <View style={styles.controls}>
            <View style={styles.controlsRow}>
              <View style={styles.placeholder} />
              
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                <RotateCcw size={24} color="#fff" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomOptions}>
              <Text style={[styles.optionText, styles.selectedOption]}>Story</Text>
              <Text style={styles.optionText}>Post</Text>
              <Text style={styles.optionText}>Reel</Text>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>

      <StoryCreator
        visible={showStoryCreator}
        onClose={closeStoryCreator}
        imageUri={capturedImage || undefined}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#8E8E8E',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#405DE6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerButton: {
    padding: 8,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 32,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  placeholder: {
    width: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  optionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOption: {
    color: '#fff',
    fontWeight: '700',
  },
});