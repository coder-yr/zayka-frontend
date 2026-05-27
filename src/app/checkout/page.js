"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { cartItems, isInitialized } = useCart();

  if (!isInitialized) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05;
  const delivery = subtotal > 0 ? 2.0 : 0;
  const total = subtotal + taxes + delivery;

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">{t("checkout")}</h1>

        <div className="mb-6">
          {cartItems.map((it) => (
            <div key={it.id} className="flex justify-between mb-2">
              <div>
                <div className="font-medium">{it.name_en || it.title}</div>
                <div className="text-sm text-gray-500">{it.quantity} x ${it.price.toFixed(2)}</div>
              </div>
              <div className="font-bold">${(it.price * it.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 mb-6">
          <div className="flex justify-between"><span>{t("subtotal")}</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{t("tax")}</span><span>${taxes.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{t("delivery")}</span><span>${delivery.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>{t("total")}</span><span>${total.toFixed(2)}</span></div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-[#D92B2B] text-white py-3 rounded font-bold">{t("pay_now") || 'Pay Now'}</button>
          <Link href="/cart" className="block text-center text-sm text-gray-600">{t("back_to_cart") || 'Back to cart'}</Link>
        </div>
      </div>
    </div>
  );
}
