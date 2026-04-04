"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ShoppingBag,
  Utensils,
  Star,
  Coffee,
  Pizza,
  Croissant,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";

const MENU_CATEGORIES = [
  { id: "recommended", nameKey: "recommended", icon: Star },
  { id: "burgers", nameKey: "burgers", icon: Utensils },
  { id: "pizza", nameKey: "pizza", icon: Pizza },
  { id: "drinks", nameKey: "beverages", icon: Coffee },
  { id: "desserts", nameKey: "desserts", icon: Croissant },
];

const MENU_ITEMS = [
  {
    id: "m1",
    category: "recommended",
    name_en: "Zaika Signature Burger",
    name_ar: "برجر زايكا المميز",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m2",
    category: "recommended",
    name_en: "Truffle Fries",
    name_ar: "بطاطس ترفل",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m3",
    category: "burgers",
    name_en: "Classic Cheeseburger",
    name_ar: "برجر تشيز كلاسيك",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m4",
    category: "burgers",
    name_en: "Double Bacon Smash",
    name_ar: "سماش بيكون مزدوج",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m5",
    category: "burgers",
    name_en: "Spicy Chicken Veggie",
    name_ar: "برجر دجاج حار بالخضار",
    price: 11.5,
    image: "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m6",
    category: "pizza",
    name_en: "Margherita Fusion",
    name_ar: "مارجريتا فيوجن",
    price: 16,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m7",
    category: "pizza",
    name_en: "Pepperoni Overload",
    name_ar: "بيبروني أوفرلود",
    price: 18.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m8",
    category: "drinks",
    name_en: "Mango Tango Smoothie",
    name_ar: "سموذي مانجو تانجو",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m9",
    category: "drinks",
    name_en: "Iced Caramel Latte",
    name_ar: "لاتيه كراميل مثلج",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1461023058943-07cb1ce8dbb3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m10",
    category: "desserts",
    name_en: "Molten Chocolate Cake",
    name_ar: "كيك شوكولاتة ذائب",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop",
  },
];

const getLocalizedField = (item, baseKey, language) => {
  if (!item || !baseKey) return "";
  const isArabic = String(language || "en").startsWith("ar");
  const localized = isArabic ? item[`${baseKey}_ar`] : item[`${baseKey}_en`];
  return localized || item[`${baseKey}_en`] || item[`${baseKey}_ar`] || "";
};

export default function KioskPage() {
  const { t, i18n } = useTranslation();
  const [screen, setScreen] = useState("welcome");
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(MENU_CATEGORIES[0].id);
  const [orderType, setOrderType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05;
  const total = subtotal + taxes;

  const resetKiosk = () => {
    setCart([]);
    setOrderType(null);
    setPaymentMethod(null);
    setOrderNumber(null);
    setSelectedCategory(MENU_CATEGORIES[0].id);
    setScreen("welcome");
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + delta };
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const currentItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setScreen("checkout");
  };

  const handlePayment = () => {
    if (!orderType || !paymentMethod) return;
    setOrderNumber(Math.floor(100 + Math.random() * 900));
    setScreen("success");
  };

  if (screen === "welcome") {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-black selection:bg-[#C82333]">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop"
          alt="Delicious Food"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="mt-8 mb-12">
            <LanguageSwitcher />
          </div>

          <div className="mb-auto mt-6">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
              Zayka POS
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-gray-200 drop-shadow-md">
              {t("fresh_fast_delicious")}
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-32">
            <button
              onClick={() => setScreen("menu")}
              className="bg-[#C82333] active:bg-red-800 text-white text-4xl md:text-5xl font-bold py-8 px-20 rounded-[3rem] shadow-[0_20px_50px_rgba(200,35,51,0.5)] transform active:scale-95 transition-all w-max max-w-[90vw]"
            >
              {t("touch_to_start")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "menu") {
    return (
      <div className="kiosk-menu-layout w-screen h-screen flex bg-[#F6F5F2] overflow-hidden selection:bg-[#C82333] rtl-text-start">
        <div className="w-48 xl:w-64 bg-white border-r border-gray-200 flex flex-col shadow-xl z-20">
          <div className="h-24 flex items-center justify-center border-b border-gray-100 p-4">
            <h2 className="text-2xl font-black text-[#C82333] tracking-tighter">Zayka POS</h2>
          </div>
          <div className="p-4">
            <LanguageSwitcher compact />
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar py-6 space-y-4 px-4">
            {MENU_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex justify-center xl:justify-start items-center gap-4 xl:px-6 py-6 rounded-3xl transition-all ${
                    isActive
                      ? "bg-[#C82333] text-white shadow-lg shadow-red-500/30"
                      : "bg-[#FAFAFA] text-gray-600 active:bg-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span className="hidden xl:block font-bold text-lg">{t(cat.nameKey)}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={resetKiosk}
            className="m-4 p-4 text-gray-400 font-bold text-center hover:text-gray-600 border-t border-gray-100"
          >
            {t("cancel_order")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 xl:p-10 bg-[#F6F5F2] pb-64 lg:pb-10 relative">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-8 capitalize">
            {t(MENU_CATEGORIES.find((c) => c.id === selectedCategory)?.nameKey || "menu")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item) => {
              const itemName = getLocalizedField(item, "name", i18n.language);
              return (
                <div key={item.id} className="bg-white rounded-[2rem] p-4 flex flex-col shadow-sm border border-gray-100">
                  <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4 relative">
                    <img src={item.image} alt={itemName} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 leading-tight mb-2 flex-1">{itemName}</h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-2xl font-black text-gray-900">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-14 h-14 rounded-full bg-[#C82333] text-white flex items-center justify-center active:bg-red-800 active:scale-95 transition-all shadow-md"
                    >
                      <Plus className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-[400px] xl:w-[450px] bg-white shadow-2xl z-30 flex flex-col absolute lg:relative bottom-0 right-0 h-[50vh] lg:h-full rounded-t-[3rem] lg:rounded-none border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">{t("your_order")}</h2>
            <div className="bg-[#FFEBE5] text-[#C82333] px-4 py-2 rounded-xl font-bold text-lg">
              {t("items_count", { count: cart.reduce((a, b) => a + b.quantity, 0) })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center gap-4">
                <ShoppingBag className="w-24 h-24 text-gray-200" />
                <p className="text-2xl font-bold text-gray-300">{t("your_cart_empty")}</p>
                <p className="text-lg">{t("select_items_prompt")}</p>
              </div>
            ) : (
              cart.map((item) => {
                const itemName = getLocalizedField(item, "name", i18n.language);
                return (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={itemName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-900 mb-1 truncate">{itemName}</h4>
                      <p className="font-bold text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#F6F5F2] rounded-full p-1.5 ml-2 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center active:bg-gray-200 shadow-sm"
                      >
                        {item.quantity === 1 ? <Trash2 className="w-5 h-5 text-red-500" /> : <Minus className="w-6 h-6" />}
                      </button>
                      <span className="w-6 text-center text-xl font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 rounded-full bg-[#C82333] text-white flex items-center justify-center active:bg-red-800 shadow-sm"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-8 bg-[#FAFAFA] border-t border-gray-100 rounded-t-none lg:rounded-none">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-lg font-medium text-gray-500">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-500">
                <span>{t("tax")}</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-3xl font-black text-gray-900 pt-4 border-t border-gray-200">
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-6 rounded-[2rem] text-3xl font-bold transition-all ${
                cart.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#C82333] text-white active:bg-red-800 active:scale-95 shadow-xl shadow-red-500/20"
              }`}
            >
              {t("checkout")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "checkout") {
    return (
      <div className="w-screen h-screen bg-[#F6F5F2] flex flex-col items-center justify-center p-6 selection:bg-[#C82333] rtl-text-start">
        <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-auto">
          <div className="px-10 py-8 border-b border-gray-100 flex items-center">
            <button
              onClick={() => setScreen("menu")}
              className="w-16 h-16 rounded-full bg-[#F6F5F2] flex items-center justify-center active:bg-gray-200 text-gray-600 mr-6"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <h1 className="text-4xl font-black text-gray-900">{t("checkout")}</h1>
            <div className="ml-auto text-3xl font-black text-[#C82333]">${total.toFixed(2)}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-500 mb-6 tracking-tight">1. {t("where_eating")}</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "Dine-in", label: t("dine_in") },
                  { value: "Takeaway", label: t("takeaway") },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setOrderType(type.value)}
                    className={`h-40 rounded-3xl border-4 flex flex-col items-center justify-center gap-4 transition-all ${
                      orderType === type.value
                        ? "border-[#C82333] bg-[#FFEBE5] text-[#C82333]"
                        : "border-gray-100 bg-white text-gray-500 active:bg-gray-50"
                    }`}
                  >
                    {type.value === "Dine-in" ? <Utensils className="w-12 h-12" /> : <ShoppingBag className="w-12 h-12" />}
                    <span className="text-2xl font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`transition-opacity duration-300 ${!orderType ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
              <h2 className="text-2xl font-bold text-gray-500 mb-6 tracking-tight">2. {t("payment_method_question")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["UPI", "Card", "Cash"].map((method) => {
                  let Icon = Banknote;
                  if (method === "UPI") Icon = Smartphone;
                  if (method === "Card") Icon = CreditCard;

                  return (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`h-32 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 transition-all ${
                        paymentMethod === method
                          ? "border-[#C82333] bg-[#FFEBE5] text-[#C82333]"
                          : "border-gray-100 bg-white text-gray-500 active:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-10 h-10" />
                      <span className="text-xl font-bold">{method}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-10 border-t border-gray-100 bg-white">
            <button
              onClick={handlePayment}
              disabled={!orderType || !paymentMethod}
              className={`w-full py-8 rounded-[3rem] text-4xl font-black transition-all ${
                !orderType || !paymentMethod
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#C82333] text-white active:bg-red-800 active:scale-95 shadow-2xl shadow-red-500/30"
              }`}
            >
              {t("confirm_order")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "success") {
    return (
      <div className="w-screen h-screen bg-[#C82333] flex flex-col items-center justify-center p-6 selection:bg-white selection:text-red-600 rtl-text-start">
        <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-16 text-center flex flex-col items-center">
          <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-10">
            <CheckCircle2 className="w-20 h-20" />
          </div>

          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">{t("payment_success")}</h1>
          <p className="text-2xl text-gray-500 mb-10 font-medium">{t("order_sent_kitchen")}</p>

          <div className="bg-[#F6F5F2] w-full rounded-3xl p-10 mb-12 border border-gray-100">
            <p className="text-lg text-gray-500 font-bold uppercase tracking-widest mb-2">{t("order_number")}</p>
            <div className="text-8xl font-black text-[#C82333] tracking-tighter">#{orderNumber}</div>

            <div className="w-full h-px bg-gray-200 my-8" />

            <p className="text-xl text-gray-600 font-medium">
              {t("estimated_prep_time")} <span className="font-bold text-gray-900">{t("mins_10_15")}</span>
            </p>
          </div>

          <button
            onClick={resetKiosk}
            className="w-full bg-black text-white py-8 rounded-[3rem] text-3xl font-bold active:bg-gray-800 active:scale-95 transition-all shadow-xl"
          >
            {t("done")}
          </button>
          <p className="mt-8 text-gray-400 font-medium">{t("reset_soon")}</p>
        </div>
      </div>
    );
  }

  return null;
}


