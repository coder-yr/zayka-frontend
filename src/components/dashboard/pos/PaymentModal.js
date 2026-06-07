"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Banknote, Smartphone, CheckCircle2, ChevronRight, XCircle } from "lucide-react";

const QUICK_AMOUNTS = [100, 500, 1000, 2000];

export default function PaymentModal({ isOpen, onClose, totalAmount, onComplete }) {
  const [payments, setPayments] = useState([]);
  const [currentMethod, setCurrentMethod] = useState("cash");
  const [currentAmountInput, setCurrentAmountInput] = useState("");

  if (!isOpen) return null;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, totalAmount - totalPaid);
  const changeDue = Math.max(0, totalPaid - totalAmount);
  
  const isFullyPaid = totalPaid >= totalAmount;

  const handleAddPayment = () => {
    let amountToAdd = Number(currentAmountInput);
    if (!amountToAdd || amountToAdd <= 0) return;
    
    setPayments([...payments, { method: currentMethod, amount: amountToAdd, id: Date.now() }]);
    setCurrentAmountInput("");
  };

  const handleQuickAmount = (amount) => {
    setCurrentAmountInput(amount.toString());
  };

  const handleExactAmount = () => {
    setCurrentAmountInput(remaining.toFixed(2));
  };

  const removePayment = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  const handleCharge = () => {
    onComplete({ payments, totalPaid, changeDue, totalAmount });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[800px]"
      >
        
        {/* Left Side: Summary & Applied Tenders */}
        <div className="w-full md:w-5/12 bg-zinc-900/40 border-r border-zinc-800 flex flex-col">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-black text-zinc-100 flex items-center justify-between">
              Order Summary
              <button onClick={onClose} className="md:hidden rounded-full p-2 text-zinc-400 hover:bg-zinc-800">
                <X className="h-5 w-5" />
              </button>
            </h2>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl text-center shadow-inner">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Due</p>
              <h1 className="text-5xl font-black text-white">₹{totalAmount.toFixed(2)}</h1>
            </div>

            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Applied Payments</p>
              <div className="space-y-2">
                <AnimatePresence>
                  {payments.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-zinc-950 p-2 rounded-xl text-primary">
                          {p.method === "cash" && <Banknote className="h-4 w-4" />}
                          {p.method === "card" && <CreditCard className="h-4 w-4" />}
                          {p.method === "upi" && <Smartphone className="h-4 w-4" />}
                        </div>
                        <span className="font-bold text-zinc-200 capitalize">{p.method}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-white">₹{p.amount.toFixed(2)}</span>
                        <button onClick={() => removePayment(p.id)} className="text-zinc-500 hover:text-red-500 transition-colors">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {payments.length === 0 && (
                  <div className="text-center p-6 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm font-semibold">
                    No payments applied yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-950 border-t border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-zinc-400">Total Paid</span>
              <span className="text-lg font-black text-green-500">₹{totalPaid.toFixed(2)}</span>
            </div>
            {changeDue > 0 ? (
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-400">Change Due</span>
                <span className="text-lg font-black text-amber-500">₹{changeDue.toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-400">Remaining</span>
                <span className="text-lg font-black text-red-500">₹{remaining.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Payment Entry */}
        <div className="flex-1 flex flex-col bg-zinc-950 relative">
          <button onClick={onClose} className="absolute right-6 top-6 hidden md:block rounded-full p-2 text-zinc-400 hover:bg-zinc-800 transition z-10">
            <X className="h-5 w-5" />
          </button>

          <div className="p-8 pb-4">
            <h2 className="text-2xl font-black text-zinc-100 mb-6">Select Payment Method</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { id: "cash", icon: Banknote, label: "Cash" },
                { id: "card", icon: CreditCard, label: "Card" },
                { id: "upi", icon: Smartphone, label: "UPI" },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = currentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setCurrentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className="h-8 w-8 mb-2" />
                    <span className="font-bold text-sm tracking-wider uppercase">{method.label}</span>
                  </button>
                );
              })}
            </div>

            {!isFullyPaid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Tender Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-400">₹</span>
                    <input
                      type="number"
                      value={currentAmountInput}
                      onChange={(e) => setCurrentAmountInput(e.target.value)}
                      placeholder={remaining.toFixed(2)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-4 pl-12 pr-4 text-3xl font-black text-white outline-none focus:border-primary transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  <button 
                    onClick={handleExactAmount}
                    className="col-span-2 sm:col-span-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm py-3 transition-colors border border-zinc-700"
                  >
                    Exact
                  </button>
                  {QUICK_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => handleQuickAmount(amt)}
                      className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-sm py-3 transition-colors border border-zinc-800"
                    >
                      +{amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddPayment}
                  disabled={!currentAmountInput || Number(currentAmountInput) <= 0}
                  className="w-full rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 py-4 font-black text-lg uppercase tracking-wider transition-colors disabled:opacity-50 shadow-xl"
                >
                  Add Tender
                </button>
              </motion.div>
            )}
          </div>

          <div className="mt-auto p-8 border-t border-zinc-800/60 bg-zinc-900/40">
            <button
              onClick={handleCharge}
              disabled={!isFullyPaid}
              className={`w-full flex items-center justify-center gap-3 rounded-2xl py-5 font-black text-xl uppercase tracking-[0.2em] transition-all shadow-xl ${
                isFullyPaid 
                  ? "bg-primary hover:bg-primary/90 text-white shadow-primary/30" 
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 className="h-6 w-6" />
              {isFullyPaid ? "Complete Transaction" : "Amount Pending"}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
