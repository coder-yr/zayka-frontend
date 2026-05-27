"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, Store, Coffee, IceCream, Cake, Beer, Pizza, 
  Clock, MapPin, Phone, ShieldCheck, Heart, Sparkles, Star, Calendar 
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const OUTLETS_DATA = {
  "fine-dine": {
    name: "Zayka Fine Dine",
    themeColor: "from-amber-600 via-rose-700 to-amber-950",
    icon: Utensils,
    description: "Indulge in our exquisite tasting menus and fine wine pairings. Curated for celebrate moments and premium gourmet dining.",
    heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    hours: "12:00 PM - 11:30 PM",
    phone: "+91 99999 88888",
    address: "Level 2, Premium Plaza, Connaught Place, New Delhi",
    specialties: [
      { name: "Truffle Grilled Ribeye", price: 1299, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300" },
      { name: "Truffle Burrata Salad", price: 599, image: "/images/home/chef_special_burrata.png" }
    ],
    features: ["Valet Parking", "Sommelier on Standby", "Private Dining Halls", "Live Jazz Music"]
  },
  "qsr": {
    name: "Zayka QSR",
    themeColor: "from-rose-500 via-pink-600 to-red-800",
    icon: Store,
    description: "Fast service, uncompromising taste. Grab our trending burgers, rolls, and quick delights on the go.",
    heroImage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800",
    hours: "11:00 AM - 01:00 AM",
    phone: "+91 99999 77777",
    address: "Ground Floor, City Walk Food Court, Saket, New Delhi",
    specialties: [
      { name: "Spicy Fire Wings", price: 399, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=300" }
    ],
    features: ["Instant Self-Checkout", "Contactless QR Order", "Takeaway Bags", "Late Night Delivery"]
  },
  "cafe": {
    name: "Zayka Cafe",
    themeColor: "from-amber-700 via-orange-600 to-amber-900",
    icon: Coffee,
    description: "Your cozy spot for artisanal espresso brews, iced coffees, and freshly baked pastries.",
    heroImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800",
    hours: "08:00 AM - 10:00 PM",
    phone: "+91 99999 66666",
    address: "Block C, Inner Circle, Metro Station Gate 4, New Delhi",
    specialties: [
      { name: "Premium Cold Brew", price: 250, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=300" },
      { name: "Warm Brownie & Gelato", price: 299, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=300" }
    ],
    features: ["High-speed Free Wi-Fi", "Charging Ports", "Outdoor Seating", "Live Acoustic Evenings"]
  },
  "pizzeria": {
    name: "Zayka Pizzeria",
    themeColor: "from-amber-600 via-red-600 to-rose-900",
    icon: Pizza,
    description: "Authentic woodfired Neapolitan pizzas topped with house-made mozzarella and fresh basil.",
    heroImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    hours: "12:00 PM - 11:00 PM",
    phone: "+91 99999 55555",
    address: "Shop 12, Market Square, Sector 15, Gurugram",
    specialties: [
      { name: "Garlic Herbs Bread", price: 249, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=300" }
    ],
    features: ["Woodfired Oven", "Fresh Mozzarella Bar", "Kid Friendly", "Craft Sodas"]
  }
};

export default function OutletPage() {
  const { outlet } = useParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [data, setData] = useState(null);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const slug = outlet || "fine-dine";
    if (OUTLETS_DATA[slug]) {
      setData(OUTLETS_DATA[slug]);
    } else {
      // Default fallback
      setData(OUTLETS_DATA["fine-dine"]);
    }
  }, [outlet]);

  const handleAddToCart = (dish) => {
    addToCart({
      id: `outlet_${dish.name.toLowerCase().replace(/\s+/g, '_')}`,
      name: dish.name,
      price: dish.price,
      image: dish.image
    });
    setAddedItem(dish.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
      </div>
    );
  }

  const IconComponent = data.icon;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pb-24">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url('${data.heroImage}')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${data.themeColor} opacity-75 z-10`} />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-black/30 z-20" />

        <div className="relative z-30 text-center px-6 max-w-3xl mt-12">
          {/* Circular Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6">
            <IconComponent size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {data.name}
          </h1>
          <p className="text-white/90 text-sm md:text-lg leading-relaxed font-medium">
            {data.description}
          </p>
        </div>
      </section>

      {/* Outlet Details & Specialties */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Left Block */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" /> Outlet Info
            </h3>
            
            {/* Timing */}
            <div className="flex items-start gap-4">
              <span className="p-2 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-xl mt-0.5">
                <Clock size={18} />
              </span>
              <div>
                <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                  Operating Hours
                </h4>
                <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-0.5">
                  {data.hours}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="p-2 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-xl mt-0.5">
                <MapPin size={18} />
              </span>
              <div>
                <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                  Address Location
                </h4>
                <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-0.5 leading-relaxed">
                  {data.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <span className="p-2 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-xl mt-0.5">
                <Phone size={18} />
              </span>
              <div>
                <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                  Reservations Helpline
                </h4>
                <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-0.5">
                  {data.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Table reservation Call to action */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 text-white text-center space-y-4 shadow-xl border border-zinc-800">
            <h4 className="text-lg font-bold">Planning to Dine-in?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Book a table now at {data.name} to avoid peak-hour queues. Enjoy complimentary appetizers on digital checkout.
            </p>
            <Link href="/reservations" className="block w-full">
              <button className="w-full bg-primary hover:bg-primary/95 text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-2xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5">
                <Calendar size={14} /> Book table here
              </button>
            </Link>
          </div>
        </div>

        {/* Specialties Right Block (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <span className="text-primary text-xs font-black tracking-[0.2em] uppercase block">
              Menu Highlights
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Specialties At This Outlet
            </h2>
          </div>

          {/* Specialties grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.specialties.map((dish) => (
              <div 
                key={dish.name}
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">
                      {dish.name}
                    </h3>
                    <span className="text-primary font-black">₹{dish.price}</span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      addedItem === dish.name
                        ? "bg-emerald-500 text-white shadow-emerald-500/10"
                        : "bg-zinc-50 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {addedItem === dish.name ? (
                      <>
                        <ShieldCheck size={14} /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Add To Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Key Attributes */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
              Outlet Features & Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
