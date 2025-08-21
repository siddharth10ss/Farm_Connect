import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'farmer';
  timestamp: string;
  type: 'text' | 'offer' | 'price_accept' | 'price_counter';
  offerPrice?: number;
  offerUnit?: string;
  productName?: string;
}

interface ChatScreenProps {
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  farmerLocation: string;
  onBack: () => void;
  productName?: string;
  currentPrice?: number;
  unit?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m interested in your Fresh Tomatoes. Are they organic?',
    sender: 'user',
    timestamp: '10:30 AM',
    type: 'text'
  },
  {
    id: '2',
    text: 'Hello! Yes, they are 100% organic. Grown without any pesticides or chemicals.',
    sender: 'farmer',
    timestamp: '10:32 AM',
    type: 'text'
  },
  {
    id: '3',
    text: 'That\'s great! The current price is ₹350/kg. Would you consider ₹320/kg for bulk purchase?',
    sender: 'user',
    timestamp: '10:35 AM',
    type: 'offer',
    offerPrice: 320,
    offerUnit: 'kg',
    productName: 'Fresh Tomatoes'
  },
  {
    id: '4',
    text: 'For orders above 5kg, I can do ₹330/kg. How much quantity are you looking for?',
    sender: 'farmer',
    timestamp: '10:38 AM',
    type: 'price_counter',
    offerPrice: 330,
    offerUnit: 'kg'
  }
];

export function ChatScreen({ 
  farmerId, 
  farmerName, 
  farmerAvatar, 
  farmerLocation, 
  onBack,
  productName = 'Fresh Tomatoes',
  currentPrice = 350,
  unit = 'kg'
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate farmer typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const farmerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! Let me check and get back to you.',
          sender: 'farmer',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, farmerResponse]);
      }, 2000);
    }
  };

  const handleQuickOffer = (offerPrice: number) => {
    const offerMessage: Message = {
      id: Date.now().toString(),
      text: `I'd like to offer ₹${offerPrice}/${unit} for ${productName}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'offer',
      offerPrice,
      offerUnit: unit,
      productName
    };
    
    setMessages(prev => [...prev, offerMessage]);
  };

  const handleAcceptPrice = () => {
    const acceptMessage: Message = {
      id: Date.now().toString(),
      text: `I accept your price of ₹${currentPrice}/${unit}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'price_accept'
    };
    
    setMessages(prev => [...prev, acceptMessage]);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E8F5E8] flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-[#4CAF50]/10 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#4CAF50]/10">
                <ImageWithFallback
                  src={farmerAvatar}
                  alt={farmerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-bold text-[#2E7D32]">{farmerName}</h1>
                <p className="text-sm text-[#4CAF50]">{farmerLocation}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#4CAF50]" />
            </button>
            <button className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-[#4CAF50]" />
            </button>
            <button className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
              <MoreVertical className="w-5 h-5 text-[#4CAF50]" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Offer Buttons */}
      <div className="px-6 py-3 bg-white/50 border-b border-[#4CAF50]/5">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickOffer(currentPrice - 30)}
            className="bg-[#FFD54F]/20 border border-[#FFD54F] text-[#2E7D32] px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#FFD54F]/30 transition-colors"
          >
            Offer ₹{currentPrice - 30}/{unit}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickOffer(currentPrice - 20)}
            className="bg-[#FFD54F]/20 border border-[#FFD54F] text-[#2E7D32] px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#FFD54F]/30 transition-colors"
          >
            Offer ₹{currentPrice - 20}/{unit}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAcceptPrice}
            className="bg-[#4CAF50] text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#2E7D32] transition-colors"
          >
            Accept ₹{currentPrice}/{unit}
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-[#4CAF50] text-white ml-4'
                    : 'bg-white/80 backdrop-blur-sm text-[#2E7D32] mr-4 border border-white/50'
                }`}
              >
                {message.type === 'offer' && (
                  <div className="mb-2 p-3 rounded-xl bg-white/20 border border-white/30">
                    <p className="text-sm font-medium">Price Offer</p>
                    <p className="text-lg font-bold">₹{message.offerPrice}/{message.offerUnit}</p>
                    <p className="text-sm opacity-80">for {message.productName}</p>
                  </div>
                )}
                
                {message.type === 'price_counter' && (
                  <div className={`mb-2 p-3 rounded-xl ${
                    message.sender === 'user' ? 'bg-white/20 border border-white/30' : 'bg-[#4CAF50]/10 border border-[#4CAF50]/20'
                  }`}>
                    <p className="text-sm font-medium">Counter Offer</p>
                    <p className="text-lg font-bold">₹{message.offerPrice}/{message.offerUnit}</p>
                  </div>
                )}
                
                <p className="leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-[#4CAF50]'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-start"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mr-4 border border-white/50">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-[#4CAF50]/10 p-6">
        <div className="flex items-end space-x-3">
          <div className="flex-1 bg-[#4CAF50]/5 border border-[#4CAF50]/20 rounded-2xl px-4 py-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-transparent border-none outline-none text-[#2E7D32] placeholder-[#4CAF50]/60"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="w-12 h-12 bg-[#4CAF50] hover:bg-[#2E7D32] text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}