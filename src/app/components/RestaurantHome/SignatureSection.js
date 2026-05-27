"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Star, Flame, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const SignatureSection = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);

  const signatureDishes = [
    {
      id: "sig_burrata",
      name: "Truffle Burrata Salad",
      price: 599,
      rating: 4.9,
      calories: "340 kcal",
      isVeg: true,
      spicy: 0,
      image: "/images/home/chef_special_burrata.png",
      description: "Creamy whole burrata on heirloom cherry tomatoes, wild arugula, roasted walnuts, drizzed with aged balsamic glaze and house truffle oil.",
    },
    {
      id: "sig_ribeye",
      name: "Truffle Grilled Ribeye",
      price: 1299,
      rating: 5.0,
      calories: "780 kcal",
      isVeg: false,
      spicy: 1,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
      description: "Dry-aged Angus ribeye basted with rosemary butter and garlic cloves, served with truffle mash, glazed carrots, and wild mushroom jus.",
    },
    {
      id: "sig_forest",
      name: "Zayka Forest Dome",
      price: 450,
      rating: 4.8,
      calories: "410 kcal",
      isVeg: true,
      spicy: 0,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
      description: "Rich dark Belgian chocolate shell enclosing a light cherry mousse, layered over almond sponge cake and chocolate soil base.",
    },
  ];

  const handleAddToCart = (dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
    setAddedItem(dish.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block mb-3">
              Culinary Art
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Chef&apos;s Signature Creations
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Every dish is a canvas. Discover our selection of seasonal highlights curated by Head Chef Vikram Singh.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/menu'}
            className="mt-6 md:mt-0 text-sm font-extrabold text-primary hover:text-primary/95 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>View Full Menu</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </motion.button>
        </div>

        {/* Delicacies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-zinc-800/80 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full ${dish.isVeg ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    {dish.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                  {dish.spicy > 0 && (
                    <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-orange-500 text-white flex items-center gap-0.5">
                      <Flame size={10} /> Spicy
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-zinc-200 shadow-md">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{dish.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                      {dish.name}
                    </h3>
                    <span className="text-gray-400 dark:text-zinc-500 text-xs font-semibold shrink-0">
                      {dish.calories}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-800 pt-6">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    ₹{dish.price}
                  </span>
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(dish)}
                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-full shadow-md transition-all duration-300 ${
                      addedItem === dish.id
                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                        : "bg-primary hover:bg-primary/95 text-white shadow-primary/20"
                    }`}
                  >
                    {addedItem === dish.id ? (
                      <>
                        <Check size={14} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Add To Cart</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
