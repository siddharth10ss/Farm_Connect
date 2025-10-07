import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';
import { supabase } from '../utils/supabase';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ route }) {
  const { profile, user } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    const uploadAvatar = async () => {
      if (!avatarUrl || avatarUrl.startsWith('http')) {
        return avatarUrl;
      }

      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const fileExt = avatarUrl.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    };

    try {
      const newAvatarUrl = await uploadAvatar();

      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: newAvatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image 
            source={{ uri: avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' }}
            style={styles.avatar}
          />
          <View style={[styles.cameraIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="camera" size={20} color={colors.primaryForeground} />
          </View>
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.mutedForeground }]}>Full Name</Text>
        <TextInput
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your Name"
          placeholderTextColor={colors.mutedForeground}
        />

        <TouchableOpacity onPress={updateProfile} style={[styles.saveButton, { backgroundColor: colors.primary }]} disabled={loading}>
          <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    padding: 8,
    borderRadius: 16,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.lg,
  },
  saveButton: {
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
