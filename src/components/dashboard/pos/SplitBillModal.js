"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Users, SplitSquareHorizontal, CheckCircle2 } from "lucide-react";

export default function SplitBillModal({ isOpen, onClose, totalAmount, onApplySplit }) {
  const [splitWays, setSplitWays] = useState(2);
  const [splitType, setSplitType] = useState("equal"); // "equal" or "custom"
  const [customAmounts, setCustomAmounts] = useState([]);

  useEffect(() => {
    if (splitType === "custom") {
      setCustomAmounts(Array(splitWays).fill(0));
    }
  }, [splitWays, splitType]);

  const handleCustomAmountChange = (index, value) => {
    const newAmounts = [...customAmounts];
    newAmounts[index] = Number(value) || 0;
    setCustomAmounts(newAmounts);
  };

  const handleApply = () => {
    let splits = [];
    if (splitType === "equal") {
      const splitAmount = totalAmount / splitWays;
      splits = Array(splitWays).fill(splitAmount);
    } else {
      splits = customAmounts;
    }
    onApplySplit(splits);
    onClose();
  };

  if (!isOpen) return null;

  const equalAmount = totalAmount / splitWays;
  const customTotal = customAmounts.reduce((a, b) => a + b, 0);
  const remaining = totalAmount - customTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between border-b border-zinc-800/60 bg-zinc-900/40 px-6 py-4">
          <h2 className="text-xl font-black text-zinc-100 flex items-center gap-2">
            <SplitSquareHorizontal className="h-5 w-5 text-primary" />
            Split Bill
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Total Bill Amount</span>
            <span className="text-2xl font-black text-white">₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex bg-zinc-900/50 rounded-xl p-1 mb-6 border border-zinc-800/50">
            <button
              onClick={() => setSplitType("equal")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                splitType === "equal" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Equal Split
            </button>
            <button
              onClick={() => setSplitType("custom")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                splitType === "custom" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Custom Amounts
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Number of Ways</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSplitWays(Math.max(2, splitWays - 1))}
                className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-bold hover:bg-zinc-800 transition"
              >
                -
              </button>
              <div className="flex-1 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-xl font-black">
                <Users className="h-5 w-5 text-zinc-500 mr-2" />
                {splitWays}
              </div>
              <button
                onClick={() => setSplitWays(Math.min(10, splitWays + 1))}
                className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-bold hover:bg-zinc-800 transition"
              >
                +
              </button>
            </div>
          </div>

          {splitType === "equal" ? (
            <div className="grid grid-cols-2 gap-3">
              {Array(splitWays).fill(0).map((_, i) => (
                <div key={i} className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Part {i + 1}</span>
                  <span className="text-xl font-black text-white">₹{equalAmount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {customAmounts.map((amt, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-2">
                  <div className="w-16 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Part {i + 1}
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">₹</span>
                    <input
                      type="number"
                      value={amt || ""}
                      onChange={(e) => handleCustomAmountChange(i, e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-8 pr-4 font-bold text-white outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              ))}
              <div className={`p-4 rounded-xl border mt-4 text-center ${Math.abs(remaining) < 0.01 ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"}`}>
                <p className="text-sm font-bold uppercase tracking-wider">
                  {Math.abs(remaining) < 0.01 ? "Fully Distributed" : `Remaining: ₹${remaining.toFixed(2)}`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800/60 bg-zinc-900/40">
          <button
            onClick={handleApply}
            disabled={splitType === "custom" && Math.abs(remaining) >= 0.01}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white py-4 font-black uppercase tracking-[0.2em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            <CheckCircle2 className="h-5 w-5" />
            Apply Split
          </button>
        </div>
      </motion.div>
    </div>
  );
}
