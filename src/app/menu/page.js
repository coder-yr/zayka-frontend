"use client";

import React, { useState, useMemo } from "react";
import { Search, Flame, Star, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  // Appetizers
  {
    id: "app_burrata",
    name: "Truffle Burrata Salad",
    category: "Appetizers",
    price: 599,
    rating: 4.9,
    calories: "340 kcal",
    isVeg: true,
    spicy: 0,
    image: "/images/home/chef_special_burrata.png",
    description: "Creamy whole burrata on heirloom cherry tomatoes, wild arugula, roasted walnuts, drizzed with aged balsamic glaze and house truffle oil.",
  },
  {
    id: "app_wings",
    name: "Spicy Fire Wings",
    category: "Appetizers",
    price: 399,
    rating: 4.7,
    calories: "520 kcal",
    isVeg: false,
    spicy: 2,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400",
    description: "Crispy chicken wings tossed in our signature extra-hot habanero and honey glaze, served with cool blue cheese dip.",
  },
  {
    id: "app_garlic",
    name: "Garlic Herbs Bread",
    category: "Appetizers",
    price: 249,
    rating: 4.5,
    calories: "280 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=400",
    description: "Artisanal sourdough slices spread with roasted garlic butter, parsley, and melted mozzarella, toasted until golden.",
  },

  // Main Course
  {
    id: "main_ribeye",
    name: "Truffle Grilled Ribeye",
    category: "Main Course",
    price: 1299,
    rating: 5.0,
    calories: "780 kcal",
    isVeg: false,
    spicy: 1,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
    description: "Dry-aged Angus ribeye basted with rosemary butter and garlic cloves, served with truffle mash, glazed carrots, and wild mushroom jus.",
  },
  {
    id: "main_paneer",
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 499,
    rating: 4.8,
    calories: "650 kcal",
    isVeg: true,
    spicy: 1,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400",
    description: "Cubes of fresh cottage cheese simmered in a rich, velvety cashew tomato gravy, finished with butter, fresh cream, and dry fenugreek leaves.",
  },
  {
    id: "main_risotto",
    name: "Wild Mushroom Risotto",
    category: "Main Course",
    price: 699,
    rating: 4.6,
    calories: "510 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400",
    description: "Creamy Italian arborio rice slow-cooked with a selection of porcini and button mushrooms, dry white wine, parmesan cheese, and truffle oil.",
  },
  {
    id: "main_chicken",
    name: "Classic Butter Chicken",
    category: "Main Course",
    price: 599,
    rating: 4.9,
    calories: "710 kcal",
    isVeg: false,
    spicy: 1,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400",
    description: "Tandoori grilled chicken tikka folded into a smooth tomato gravy rich in cream and butter, spiced with sweet Kashmiri chilies.",
  },

  // Desserts
  {
    id: "des_forest",
    name: "Zayka Forest Dome",
    category: "Desserts",
    price: 450,
    rating: 4.8,
    calories: "410 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400",
    description: "Rich dark Belgian chocolate shell enclosing a light cherry mousse, layered over almond sponge cake and chocolate soil base.",
  },
  {
    id: "des_cheesecake",
    name: "New York Cheesecake",
    category: "Desserts",
    price: 390,
    rating: 4.7,
    calories: "480 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400",
    description: "Dense and creamy classic cheesecake on a sweet graham cracker crust, topped with fresh raspberry compote and mint leaf.",
  },
  {
    id: "des_brownie",
    name: "Warm Brownie & Gelato",
    category: "Desserts",
    price: 299,
    rating: 4.6,
    calories: "530 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=400",
    description: "Fudgy double chocolate walnut brownie served warm, topped with a scoop of Madagascar vanilla bean gelato and dark chocolate fudge sauce.",
  },

  // Beverages
  {
    id: "bev_coldbrew",
    name: "Premium Cold Brew",
    category: "Beverages",
    price: 250,
    rating: 4.8,
    calories: "5 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400",
    description: "Single-origin Arabica coffee beans steeped in cold mountain spring water for 18 hours, served over ice crystal block.",
  },
  {
    id: "bev_mojito",
    name: "Classic Mint Mojito",
    category: "Beverages",
    price: 180,
    rating: 4.4,
    calories: "120 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400",
    description: "Refreshing cooler with muddled fresh spearmint leaves, lime wedges, pure cane sugar syrup, and soda water over crushed ice.",
  },
  {
    id: "bev_lassi",
    name: "Fresh Mango Lassi",
    category: "Beverages",
    price: 150,
    rating: 4.7,
    calories: "210 kcal",
    isVeg: true,
    spicy: 0,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400",
    description: "Thick yogurt beverage blended with sweet Alphonso mango pulp, a touch of cardamom, sugar, and garnished with saffron strands.",
  },
];

const CATEGORIES = ["All", "Appetizers", "Main Course", "Desserts", "Beverages"];

export default function MenuPage() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [activeCategory, searchQuery, vegOnly]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block">
            Gastronomy
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Culinary Menu
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            Experience our curated menu of modern fusion recipes, local seasonal delights, and handmade desserts prepared with gourmet ingredients.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-6 md:p-8 mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative w-full lg:w-[350px]">
              <input
                type="text"
                placeholder={t("find_dish") || "Search for a dish..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Veg Toggle Switch */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <span className="text-sm font-bold text-gray-700 dark:text-zinc-300">
                Vegetarian Only
              </span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                  vegOnly ? "bg-emerald-500" : "bg-gray-200 dark:bg-zinc-800"
                }`}
                aria-label="Toggle Vegetarian Only"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                    vegOnly ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Category Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-zinc-800/80 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Item Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-zinc-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                      <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        item.isVeg ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      {item.spicy > 0 && (
                        <span className="text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-full bg-orange-500 text-white flex items-center gap-0.5">
                          <Flame size={9} /> {item.spicy === 2 ? 'Extra Spicy' : 'Spicy'}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-zinc-200 shadow-sm">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Item Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-gray-400 dark:text-zinc-500 text-[10px] font-semibold shrink-0 pt-1">
                          {item.calories}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Item Price and Action */}
                    <div className="flex items-center justify-between border-t border-gray-50 dark:border-zinc-800 pt-5">
                      <span className="text-xl font-black text-gray-900 dark:text-white">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm transition-all duration-300 ${
                          addedItem === item.id
                            ? "bg-emerald-500 text-white"
                            : "bg-primary hover:bg-primary/95 text-white"
                        }`}
                        aria-label={`Add ${item.name} to order`}
                      >
                        {addedItem === item.id ? (
                          <>
                            <Check size={12} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={12} />
                            <span>Add To Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-zinc-800">
              <span className="text-4xl">🍽️</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">
                No Dishes Found
              </h3>
              <p className="text-gray-500 dark:text-zinc-400 text-sm mt-2">
                We couldn&apos;t find anything matching your filters. Try clearing your search query.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
