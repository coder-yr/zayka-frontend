"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Kabir Malhotra",
      role: "Connoisseur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      review: "The Truffle Burrata Salad is a masterclass in balance. The ambient lighting and the attentive service at the Fine Dine outlet made our anniversary dinner absolutely unforgettable.",
      rating: 5,
    },
    {
      name: "Dr. Aisha Rahman",
      role: "Food Journalist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      review: "As someone who writes about dining for a living, Zayka's commitment to sourcing raw spices shines through. The cashless Table QR checkout was fast and seamless.",
      rating: 5,
    },
    {
      name: "Rohan & Priya Verma",
      role: "Regular Guests",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120",
      review: "We love visiting the Zayka Cafe on weekends. The coffee selection is unmatched, and their loyalty points make us want to return every single Saturday.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block mb-3">
            Guest Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {t("restaurant.testimonials.title") || "What Our Guests Say"}
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-lg">
            {t("restaurant.testimonials.subtitle") || "Stories of memorable dining and handcrafted hospitality from our community."}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800/80 shadow-md relative hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <span className="text-primary/20 block mb-6">
                  <Quote size={40} className="fill-current" />
                </span>

                {/* Review Text */}
                <p className="text-gray-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed italic mb-8">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Guest Profile Details */}
              <div className="flex items-center gap-4 border-t border-gray-100 dark:border-zinc-800 pt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-900 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {item.name}
                  </h4>
                  <span className="text-gray-400 dark:text-zinc-500 text-xs font-semibold">
                    {item.role}
                  </span>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
