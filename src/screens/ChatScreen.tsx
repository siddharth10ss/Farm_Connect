import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'farmer';
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m interested in your fresh tomatoes. Are they still available?',
    sender: 'user',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: '2',
    text: 'Hello! Yes, I have fresh tomatoes available. They were harvested this morning.',
    sender: 'farmer',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: '3',
    text: 'Great! Can you tell me more about the quality and how they were grown?',
    sender: 'user',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '4',
    text: 'These are organic tomatoes grown without any pesticides. They\'re vine-ripened and perfect for cooking or salads. Very juicy and flavorful!',
    sender: 'farmer',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
];

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');

  // @ts-ignore - Route params typing
  const { farmer, product } = route.params;

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate farmer response after a delay
      setTimeout(() => {
        const farmerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message! I\'ll get back to you shortly.',
          sender: 'farmer',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, farmerResponse]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.sender === 'user';
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.farmerMessageContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUser ? colors.primary : colors.card,
              alignSelf: isUser ? 'flex-end' : 'flex-start',
            }
          ]}
        >
          <Text
            style={[
              styles.messageText,
              { color: isUser ? colors.primaryForeground : colors.foreground }
            ]}
          >
            {message.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              { color: isUser ? colors.primaryForeground + '80' : colors.mutedForeground }
            ]}
          >
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <View style={styles.farmerInfo}>
          <Text style={[styles.farmerName, { color: colors.foreground }]}>
            {farmer.name}
          </Text>
          <View style={styles.farmerLocation}>
            <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
            <Text style={[styles.farmerLocationText, { color: colors.mutedForeground }]}>
              {farmer.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.callButton, { backgroundColor: colors.primary + '1A' }]}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Product Context */}
      {product && (
        <Animated.View
          style={[
            styles.productContext,
            {
              backgroundColor: colors.muted,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Ionicons name="bag-outline" size={16} color={colors.primary} />
          <Text style={[styles.productContextText, { color: colors.foreground }]}>
            Discussing: {product.name} - ₹{product.price}/{product.unit}
          </Text>
        </Animated.View>
      )}

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => renderMessage(message, index))}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.inputContainer, { backgroundColor: colors.card }]}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={[styles.attachButton, { backgroundColor: colors.primary + '1A' }]}>
            <Ionicons name="attach-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
                color: colors.foreground 
              }
            ]}
            placeholder="Type a message..."
            placeholderTextColor={colors.mutedForeground}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { 
                backgroundColor: inputText.trim() ? colors.primary : colors.muted,
              }
            ]}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? colors.primaryForeground : colors.mutedForeground} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 2,
  },
  farmerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  farmerLocationText: {
    fontSize: theme.fontSize.sm,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContext: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    gap: 8,
  },
  productContextText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  messageContainer: {
    marginVertical: 2,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  farmerMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 16,
    ...theme.shadows.sm,
  },
  messageText: {
    fontSize: theme.fontSize.md,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: theme.fontSize.xs,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
