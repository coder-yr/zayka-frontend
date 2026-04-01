"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Bell, User, Trash2, Plus, Minus, Truck, Play, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, isInitialized } = useCart();
  
  if (!isInitialized) {
    return null; // Or a loading spinner to prevent hydration mismatch
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.05; // 5% tax as requested
  const delivery = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + taxes + delivery;
  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans selection:bg-[#C82333] selection:text-white">
      
      {/* Navbar Placeholder for typical header */}
      <nav className="w-full bg-white sticky top-0 z-50 py-4 px-6 md:px-12 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg md:text-xl tracking-tight leading-none">
              The Culinary Architect
            </span>
          </div>
          
          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">Menu</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Catering</Link>
            <Link href="/our-story" className="hover:text-gray-900 transition-colors">Our Story</Link>
            <Link href="/reservations" className="hover:text-gray-900 transition-colors">Reservations</Link>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="Find a dish..." 
                className="bg-gray-50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none w-64 border border-gray-200"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            
            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingCart className="text-gray-700 w-[22px] h-[22px] hover:text-gray-900 transition-colors" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D92B2B] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-[1.5px] border-white">
                  {cartTotalItems}
                </span>
              )}
            </Link>

            <button className="text-gray-600 hover:text-gray-900">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 cursor-pointer border-2 border-transparent hover:border-gray-300">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" alt="User" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Cart Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 lg:py-16">
        
        {/* Page Title */}
        <div className="mb-10 relative inline-block">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Your Cart ({cartTotalItems} Items)
          </h1>
          {/* Custom thick red underline under "Your" word */}
          <div className="absolute -bottom-2.5 left-0 w-16 h-[4px] bg-[#D92B2B] rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column - Cart Items */}
          <div className="flex-grow w-full lg:w-[65%] space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6 max-w-sm">Looks like you haven't added any delicious dishes yet. Explore our menu to find your next meal!</p>
                <Link href="/home" className="bg-[#D92B2B] text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-red-500/20 hover:bg-red-700 transition">
                  Browse Menu
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-6 relative group">
                  {/* Trash Icon */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-[#D92B2B] transition-colors"
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>

                {/* Product Image */}
                <div className="w-full sm:w-[140px] h-[140px] flex-shrink-0 bg-gray-100 rounded-3xl overflow-hidden m-auto sm:m-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-1">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${item.badgeColor}`}>
                      {item.badgeText}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight pr-6">{item.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-sm">
                    {item.description}
                  </p>
                  
                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    <div className="flex items-center bg-[#F7F7F7] rounded-full p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-[15px] font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-[#D92B2B] text-white flex items-center justify-center hover:bg-red-700 shadow shadow-red-500/30 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

            {/* Banners Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              {/* Promo Banner */}
              <div className="bg-[#FFEBE5] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center border border-orange-50/50">
                <h4 className="text-[17px] font-bold text-[#802D2D] mb-1.5 leading-tight">Complimentary Side?</h4>
                <p className="text-[14px] text-[#A64646] mb-4 pr-10 leading-snug font-medium">
                  Add our signature Garlic Knots for just $4.99
                </p>
                <button className="text-[#C82333] font-bold text-[13px] hover:text-red-800 transition-colors underline underline-offset-4 w-max">
                  Add to Order
                </button>
                
                {/* Abstract fork graphic (imitating the screenshot) */}
                <div className="absolute right-[-20%] bottom-[-20%] text-[#FCA5A5]/30 pointer-events-none rotate-45 scale-[2]">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H7V8h4V6h2v2h4v4h-4v4zm0-6V8h2v2h-2z" />
                  </svg>
                </div>
              </div>

              {/* Delivery Banner */}
              <div className="bg-[#F6F6F6] rounded-3xl p-6 md:p-8 flex items-center gap-5 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#D92B2B]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Fast Delivery</h4>
                  <p className="text-[13px] text-gray-500 font-medium tracking-tight">Estimated arrival in 25–35 mins</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-28">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

              <div className="space-y-5 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-[15px]">
                    <span className="text-gray-500 truncate pr-4">{item.title} <span className="text-gray-400 mx-0.5">x</span> {item.quantity}</span>
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500">Taxes</span>
                  <span className="font-bold text-gray-900">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-bold text-gray-900">${delivery.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Field */}
              <div className="flex items-center gap-2 mb-8 p-1.5 bg-[#F6F6F6] rounded-xl border border-gray-100">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="bg-transparent flex-grow px-4 text-[15px] focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
                <button className="bg-[#1C1C1C] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm">
                  Apply
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-[#D92B2B] text-white font-bold text-[17px] py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 mb-8">
                Proceed to Checkout
              </button>

              {/* Mini icons (Payments) */}
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <CreditCard className="w-6 h-6"/>
                <CreditCard className="w-6 h-6"/>
                <CreditCard className="w-6 h-6"/>
              </div>
            </div>

            {/* Delivery To Block */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Delivery To</span>
              </div>
              <p className="text-[14px] font-bold text-gray-900 mb-3 leading-tight">
                124 Curator Avenue, Upper East Side
              </p>
              <button className="text-[10px] font-bold text-[#D92B2B] uppercase tracking-wide hover:underline underline-offset-2">
                CHANGE ADDRESS
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Simple Footer Placeholder matching layout constraints */}
      <footer className="w-full bg-[#fafafa] py-10 mt-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
          <div className="font-bold text-gray-900 text-sm mb-4 md:mb-0">The Culinary Architect</div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Accessibility</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Contact Us</Link>
          </div>
          <p>© 2024 The Culinary Architect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const MapPin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
