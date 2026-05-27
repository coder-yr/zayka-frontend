"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pt-32 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Connect With Zayka
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            Have a question about our menu, reservations, catering services, or private events? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Info (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contact Details
              </h2>
              
              {/* Phone Helpline */}
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-2xl mt-1 shrink-0">
                  <Phone size={20} />
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Helpline Numbers
                  </h4>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-1">
                    +91 99999 99999
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">
                    Monday to Sunday, 09:00 AM - 11:30 PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-2xl mt-1 shrink-0">
                  <Mail size={20} />
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Email Address
                  </h4>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-1">
                    hospitality@zaykarestaurants.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">
                    For catering & private booking inquiries.
                  </p>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-2xl mt-1 shrink-0">
                  <MapPin size={20} />
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Corporate Office
                  </h4>
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-1 leading-relaxed">
                    104 Gourmet Boulevard, Sector 15, Connaught Place, New Delhi, India 110001
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Times Summary card */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Clock size={14} /> Service Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-semibold text-gray-700 dark:text-zinc-300">
                  <span>Fine Dine Outlet:</span>
                  <span>12:00 PM - 11:30 PM</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-zinc-300">
                  <span>Cafe & Bakery Outlet:</span>
                  <span>08:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 dark:text-zinc-300">
                  <span>QSR (Quick Service):</span>
                  <span>11:00 AM - 01:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Message Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800/80 p-8 md:p-12 shadow-xl relative">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                <MessageSquare size={22} className="text-primary" /> Send Us A Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>

                {/* Subject Selector */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Inquiry Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Reservations Help">Reservations Help</option>
                      <option value="Catering & Private Events">Catering & Private Events</option>
                      <option value="Guest Feedback">Guest Feedback</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist you?"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    rows="5"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white text-sm font-extrabold px-8 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20"
                >
                  Send Message
                </button>
              </form>

              {/* Submitted Feedback Overlay */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="text-emerald-500 mb-4"
                    >
                      <CheckCircle size={64} className="fill-current text-white dark:text-zinc-900" />
                    </motion.span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-sm">
                      Thank you for contacting us. A guest relationship executive will get back to you within 24 business hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
