import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';
import { supabase } from '../utils/supabase';
import * as ImagePicker from 'expo-image-picker';

export default function AddProductScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addProduct = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a product.');
      setLoading(false);
      return;
    }

    let imageUrl = '';
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileExt = image.split('.').pop();
      const fileName = `${user.id}_${new Date().getTime()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, blob);

      if (uploadError) {
        Alert.alert('Error', 'Failed to upload image.');
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      imageUrl = publicUrl;
    }

    const { error } = await supabase.from('products').insert({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image_url: imageUrl,
      farmer_id: user.id,
    });

    if (error) {
      Alert.alert('Error', 'Failed to add product.');
    } else {
      Alert.alert('Success', 'Product added successfully.');
      navigation.goBack();
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Add New Product</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={pickImage} style={[styles.imagePicker, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {image ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color={colors.mutedForeground} />
              <Text style={{ color: colors.mutedForeground }}>Add Product Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.mutedForeground }]}>Product Name</Text>
        <TextInput
          style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
          placeholder="e.g., Fresh Tomatoes"
          placeholderTextColor={colors.mutedForeground}
        />

        <Text style={[styles.label, { color: colors.mutedForeground }]}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
          value={description}
          onChangeText={setDescription}
          placeholder="e.g., Organic, locally grown"
          placeholderTextColor={colors.mutedForeground}
          multiline
        />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>Price (per kg)</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
              value={price}
              onChangeText={setPrice}
              placeholder="e.g., 50"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.col}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>Quantity (kg)</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="e.g., 100"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity onPress={addProduct} style={[styles.saveButton, { backgroundColor: colors.primary }]} disabled={loading}>
          <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  imagePicker: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imagePlaceholder: {
    alignItems: 'center',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  col: {
    flex: 1,
  },
  saveButton: {
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  saveButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
