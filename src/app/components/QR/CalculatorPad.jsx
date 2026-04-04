"use client";
import React from "react";
import { Delete, DeleteIcon, TextCursor } from "lucide-react";

const CalculatorPad = ({ onInput }) => {
  const keys = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "+"
  ];

  const handleKey = (key) => {
    onInput(key);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handleKey(key)}
          className={`
            aspect-square rounded-2xl text-xl font-bold transition-all active:scale-95 flex items-center justify-center
            ${['/', '*', '-', '+'].includes(key) 
              ? 'bg-pink-100 dark:bg-pink-900/20 text-[#E80F88]' 
              : key === 'C' 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-500'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          {key === "*" ? "×" : key === "/" ? "÷" : key}
        </button>
      ))}
      <button
        onClick={() => handleKey("⌫")}
        className="col-span-4 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-bold flex items-center justify-center gap-2"
      >
        <Delete size={20} />
      </button>
    </div>
  );
};

export default CalculatorPad;
