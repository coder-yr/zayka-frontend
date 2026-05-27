"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

export default function ReservationsPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = [
    { time: "12:30 PM", status: "Available" },
    { time: "01:30 PM", status: "Available" },
    { time: "02:30 PM", status: "Almost Full" },
    { time: "07:00 PM", status: "Available" },
    { time: "08:30 PM", status: "Almost Full" },
    { time: "09:30 PM", status: "Available" },
  ];

  const handleNext = () => {
    if (step === 1 && guestCount) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pt-32 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> {t("pages.reservations.backToHome")}
        </Link>

        {/* Card Wrapper */}
        <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-gray-100 dark:border-zinc-800/80 p-8 md:p-12 shadow-xl">
          
          {/* Header */}
          <div className="mb-8">
            <span className="text-primary text-xs font-black tracking-[0.25em] uppercase block mb-2">
              {t("pages.reservations.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {t("pages.reservations.heading")}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm mt-3">
              {t("pages.reservations.description")}
            </p>
          </div>

          {/* Progress Indicators */}
          {!confirmed && (
            <div className="flex items-center gap-2 mb-10 text-xs font-black uppercase tracking-widest text-gray-400">
              <span className={step >= 1 ? "text-primary" : ""}>1. Table Size</span>
              <span>/</span>
              <span className={step >= 2 ? "text-primary" : ""}>2. Date & Time</span>
              <span>/</span>
              <span className={step >= 3 ? "text-primary" : ""}>3. Contact Info</span>
            </div>
          )}

          {/* Booking Content Blocks */}
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 1: Table Size */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Users size={18} className="text-primary" /> Select Number of Guests
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["1-2 People", "3-4 People", "5-6 People", "7+ People"].map((count) => (
                        <button
                          key={count}
                          onClick={() => setGuestCount(count)}
                          className={`py-4 rounded-2xl border text-sm font-bold transition-all ${
                            guestCount === count
                              ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-primary/50"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-8">
                    {/* Date Input */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar size={18} className="text-primary" /> Select Reservation Date
                      </h3>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full max-w-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Clock size={18} className="text-primary" /> Choose Available Time Slot
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              selectedTime === slot.time
                                ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                                : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-primary/50"
                            }`}
                          >
                            <p className="font-bold text-sm">{slot.time}</p>
                            <p className={`text-[10px] font-black tracking-wider uppercase mt-1 ${
                              selectedTime === slot.time 
                                ? "text-white/80" 
                                : slot.status === "Available" 
                                  ? "text-emerald-500" 
                                  : "text-amber-500"
                            }`}>
                              {slot.status}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Guest & Contact Info */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck size={18} className="text-primary" /> Contact Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                        <input
                          type="text"
                          value={guestInfo.name}
                          onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <input
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                          placeholder="Your Phone"
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        placeholder="Your Email"
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Special Requests / Seating Notes</label>
                      <textarea
                        value={guestInfo.notes}
                        onChange={(e) => setGuestInfo({ ...guestInfo, notes: e.target.value })}
                        placeholder="E.g. anniversary dinner, high chair required, quiet corner table..."
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none"
                        rows="3"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/95 text-white text-sm font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-primary/20"
                    >
                      Confirm Reservation Booking
                    </button>
                  </form>
                )}

                {/* Wizard navigation bar */}
                {step < 3 && (
                  <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-850 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 1}
                      className={`text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg border transition-all ${
                        step === 1 
                          ? "border-transparent text-gray-300 pointer-events-none" 
                          : "border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={(step === 1 && !guestCount) || (step === 2 && (!selectedDate || !selectedTime))}
                      className={`text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg text-white transition-all flex items-center gap-1.5 ${
                        (step === 1 && !guestCount) || (step === 2 && (!selectedDate || !selectedTime))
                          ? "bg-gray-300 dark:bg-zinc-800 pointer-events-none"
                          : "bg-primary hover:bg-primary/95"
                      }`}
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              // Step 4: Booking Confirmed Screen
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="text-emerald-500 flex justify-center">
                  <CheckCircle size={72} className="fill-current text-white dark:text-zinc-900" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Reservation Confirmed!
                  </h2>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
                    We look forward to hosting you. A confirmation email and SMS with reservation code <span className="font-mono font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">ZYK-4029</span> has been sent.
                  </p>
                </div>

                {/* Booking summary ticket */}
                <div className="max-w-md mx-auto border border-gray-150 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left space-y-3 shadow-md">
                  <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest font-black">
                    <span>Summary details</span>
                    <span className="text-primary font-bold">Confirmed</span>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-zinc-800 my-2" />
                  
                  <div className="space-y-2 text-sm text-gray-700 dark:text-zinc-300">
                    <p className="flex justify-between"><span className="font-bold">Guest:</span> {guestInfo.name}</p>
                    <p className="flex justify-between"><span className="font-bold">Guests Size:</span> {guestCount}</p>
                    <p className="flex justify-between"><span className="font-bold">Date:</span> {selectedDate}</p>
                    <p className="flex justify-between"><span className="font-bold">Time Slot:</span> {selectedTime}</p>
                    {guestInfo.notes && (
                      <p className="text-xs text-gray-500 bg-gray-50 dark:bg-zinc-950 p-2.5 rounded-lg mt-1 italic">
                        &ldquo;{guestInfo.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/">
                    <button className="bg-primary hover:bg-primary/95 text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition">
                      Return to Home
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}
