import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Plus, Minus, ShoppingCart, MessageCircle, Shield, Truck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  location: string;
  category: string;
  image: string;
  farmer: {
    name: string;
    avatar: string;
    location: string;
    rating: number;
    totalSales: number;
  };
  description: string;
  availableQuantity: number;
  nutritionInfo?: string[];
}

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onChatWithFarmer: (farmerInfo: { name: string; avatar: string; location: string }) => void;
}

export function ProductDetailScreen({ 
  product, 
  onBack, 
  onAddToCart, 
  onChatWithFarmer 
}: ProductDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      onAddToCart(product.id, quantity);
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleChatWithFarmer = () => {
    onChatWithFarmer({
      name: product.farmer.name,
      avatar: product.farmer.avatar,
      location: product.farmer.location
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'fill-secondary text-secondary' 
            : 'text-muted-foreground/40'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="font-bold text-foreground">Product Details</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-muted/20">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-2xl px-3 py-2">
            <span className="text-lg font-bold text-foreground">₹{product.price}/{product.unit}</span>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
            <div className="flex items-center space-x-1 mb-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{product.location}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Organic</p>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Fresh</p>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Premium</p>
            </div>
          </div>

          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-3">Nutrition Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {product.nutritionInfo.map((info, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {info}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stock Info */}
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl">
            <span className="text-muted-foreground">Available Stock</span>
            <span className="font-bold text-foreground">{product.availableQuantity} {product.unit}</span>
          </div>
        </motion.div>

        {/* Farmer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border"
        >
          <h3 className="font-bold text-foreground mb-4">Meet the Farmer</h3>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10">
              <ImageWithFallback
                src={product.farmer.avatar}
                alt={product.farmer.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-foreground">{product.farmer.name}</h4>
              <div className="flex items-center space-x-1 mb-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{product.farmer.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(Math.floor(product.farmer.rating))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.farmer.rating} • {product.farmer.totalSales} sales
                </span>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleChatWithFarmer}
            className="w-full py-3 bg-secondary/20 border border-secondary text-secondary-foreground rounded-2xl font-medium flex items-center justify-center space-x-2 hover:bg-secondary/30 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Farmer</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-border p-6">
        <div className="flex items-center space-x-4">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-3 bg-muted/30 rounded-2xl p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Minus className="w-4 h-4 text-primary" />
            </button>
            <span className="font-bold text-foreground min-w-[2rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
              className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex-1 py-4 rounded-2xl font-medium flex items-center justify-center space-x-2 shadow-lg transition-all duration-200 ${
              isAddingToCart
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart ₹{product.price * quantity}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-24"></div>
    </div>
  );
}