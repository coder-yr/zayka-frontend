"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, ChevronRight, Plus, Apple, Play, Check } from "lucide-react";
import { homeContentService } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
// We use Play as a stand-in for Google Play icon if we don't have it, but standard layout used specific SVG/icon.
// We'll use simple SVGs for App Store and Google Play for accuracy.

// ---- DATA ---- //
const DEFAULT_HOME_CONTENT = {
  heroBanner: {
    badge: "Limited Offer",
    heading: "Zayaka",
    description:
      "Experience a curated selection of artisanal dishes crafted by our master chefs. Get 20% off on your first order.",
    ctaText: "Order Now",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop",
    alt: "Food Spread",
  },
  categories: [
    { name: "Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop" },
    { name: "Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop" },
    { name: "Desserts", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=300&auto=format&fit=crop" },
    { name: "Drinks", img: "https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Healthy", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop" },
    { name: "Salads", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300&auto=format&fit=crop" },
    { name: "Grills", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop" },
  ],
  trendingBanners: {
    main: {
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      alt: "Pizza",
      badgeLabel: "Pure Veg",
      badgeColor: "green",
      title: "Truffle Mushroom Artisan Pizza",
      description: "Infused with white truffle oil, wild forest mushrooms, and hand-torn fior di latte mozzarella.",
      price: "24.00",
      rating: "4.9",
      ratingCount: "(1.2k+)",
      ctaText: "Add to Cart",
    },
    side: {
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      alt: "Poke Bowl",
      badgeLabel: "Non-Veg",
      badgeColor: "red",
      title: "Pacific Poke Bowl",
      description: "Sustainably sourced Ahi tuna with wasabi aïoli, avocado, and pickled radish.",
      price: "18.50",
      ctaText: "Add to Cart",
    },
  },
  menuTabs: ["All", "Breakfast", "Lunch", "Dinner", "Beverages"],
  menuItems: [
    { title: "Buffalo Glazed Wings", desc: "Spicy honey glaze with blue cheese dip.", price: 12, img: "https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?q=80&w=600&auto=format&fit=crop" },
    { title: "Seared Sea Scallops", desc: "Butter basted with citrus micro-greens.", price: 31, img: "https://images.unsplash.com/photo-1626790680587-41802dc94c2c?q=80&w=600&auto=format&fit=crop" },
    { title: "Burrata Caprese", desc: "Creamy burrata, heirloom tomatoes.", price: 15, img: "https://images.unsplash.com/photo-1608897013039-887f214b985c?q=80&w=600&auto=format&fit=crop" },
    { title: "Velvet Berry Cheesecake", desc: "New York style with forest berry coulis.", price: 9, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" },
  ],
};

const normalizeHomeContent = (data) => {
  if (!data || typeof data !== "object") return DEFAULT_HOME_CONTENT;

  const normalizeArray = (value, fallback) => (Array.isArray(value) ? value : fallback);
  const normalizeObject = (value, fallback) => (value && typeof value === "object" ? value : fallback);

  return {
    heroBanner: { ...DEFAULT_HOME_CONTENT.heroBanner, ...normalizeObject(data.heroBanner, {}) },
    categories: normalizeArray(data.categories, DEFAULT_HOME_CONTENT.categories),
    trendingBanners: {
      main: {
        ...DEFAULT_HOME_CONTENT.trendingBanners.main,
        ...normalizeObject(data.trendingBanners?.main, {}),
      },
      side: {
        ...DEFAULT_HOME_CONTENT.trendingBanners.side,
        ...normalizeObject(data.trendingBanners?.side, {}),
      },
    },
    menuTabs: normalizeArray(data.menuTabs, DEFAULT_HOME_CONTENT.menuTabs),
    menuItems: normalizeArray(data.menuItems, DEFAULT_HOME_CONTENT.menuItems),
  };
};

// ---- COMPONENTS ---- //

function Navbar() {
  const { t } = useTranslation();
  const { cartItems } = useCart();
  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="w-full bg-[#FCFBF9] sticky top-0 z-50 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" stroke="#C82333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2L12 22" stroke="#C82333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-gray-900 text-lg md:text-xl tracking-tight leading-none">
            Zayaka
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="#" className="text-gray-900 relative">
            {t("menu")}
            <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#C82333] rounded-full"></span>
          </Link>
          <Link href="/reservations" className="hover:text-gray-900 transition-colors">{t("reservations")}</Link>
          <Link href="/our-story" className="hover:text-gray-900 transition-colors">{t("our_story")}</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <div className="relative hidden lg:block">
            <input 
              type="text" 
              placeholder={t("find_dish")} 
              className="bg-gray-100 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-gray-700 w-6 h-6 hover:text-gray-900 transition-colors" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C82333] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#FCFBF9]">
                {cartTotalItems}
              </span>
            )}
          </Link>

          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-200 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
               alt="User Avatar" 
               className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </nav>
  );
}

function CustomFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#FCFBF9] pt-16 pb-8 border-t border-gray-100 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-3 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22H22L12 2Z" stroke="#C82333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2L12 22" stroke="#C82333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-gray-900 text-lg">Zayaka</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {t("pages.homeStandalone.footerDescription")}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 font-bold text-xs">𝕏</div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 font-bold text-xs">in</div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 font-bold text-xs">f</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-5">{t("components.footer.company")}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-gray-900">{t("our_story")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("components.footer.careers")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("pages.homeStandalone.partnerWithUs")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("pages.homeStandalone.blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-5">{t("components.footer.support")}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-gray-900">{t("components.footer.helpCenter")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("pages.homeStandalone.safety")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("contact_us")}</Link></li>
              <li><Link href="#" className="hover:text-gray-900">{t("pages.homeStandalone.terms")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-5">{t("pages.homeStandalone.downloadOurApp")}</h4>
            <div className="space-y-3">
              <button className="w-full bg-[#1A1A1A] text-white rounded-lg flex items-center px-4 py-2 hover:bg-black transition-colors">
                <Apple className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-[9px] text-gray-400 font-medium">{t("pages.homeStandalone.downloadOn")}</div>
                  <div className="text-[13px] font-semibold tracking-wide leading-none">{t("pages.homeStandalone.appStore")}</div>
                </div>
              </button>
              <button className="w-full bg-[#1A1A1A] text-white rounded-lg flex items-center px-4 py-2 hover:bg-black transition-colors">
                {/* Fallback play icon since we don't have the Google Play svg easily imported */}
                <Play className="w-5 h-5 mr-4 ml-0.5 fill-white" />
                <div className="text-left">
                  <div className="text-[9px] text-gray-400 font-medium">{t("pages.homeStandalone.getItOn")}</div>
                  <div className="text-[13px] font-semibold tracking-wide leading-none">{t("pages.homeStandalone.googlePlay")}</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 text-xs text-gray-400 font-medium">
          <p>{t("pages.homeStandalone.copyright")}</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0 uppercase tracking-widest">
            <Link href="#" className="hover:text-gray-600">{t("privacy_policy")}</Link>
            <Link href="#" className="hover:text-gray-600">{t("terms_service")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function StandaloneHomePage() {
  const { t } = useTranslation();
  const [homeContent, setHomeContent] = useState(DEFAULT_HOME_CONTENT);
  const apiOrigin = useMemo(
    () => (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, ""),
    []
  );

  const resolveMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("uploads/")) return `${apiOrigin}/public/${url}`;
    if (url.startsWith("/uploads/")) return `${apiOrigin}/public${url}`;
    if (url.startsWith("/")) return `${apiOrigin}${url}`;
    return `${apiOrigin}/${url}`;
  };

  useEffect(() => {
    let mounted = true;

    const fetchHomeContent = async () => {
      try {
        const response = await homeContentService.getHomeContent();
        const normalized = normalizeHomeContent(response?.data);
        if (mounted) setHomeContent(normalized);
      } catch (error) {
        console.error("Failed to fetch home content", error);
      }
    };

    fetchHomeContent();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => homeContent.categories || [], [homeContent]);
  const signatureMenu = useMemo(() => homeContent.menuItems || [], [homeContent]);
  const menuTabs = useMemo(() => homeContent.menuTabs || [], [homeContent]);
  const heroBanner = homeContent.heroBanner || DEFAULT_HOME_CONTENT.heroBanner;
  const trendingMain = homeContent.trendingBanners?.main || DEFAULT_HOME_CONTENT.trendingBanners.main;
  const trendingSide = homeContent.trendingBanners?.side || DEFAULT_HOME_CONTENT.trendingBanners.side;

  const { addToCart } = useCart();

  const handleAddTrendingMain = () => {
    addToCart({
      id: "trending-main",
      title: trendingMain.title,
      price: parseFloat(trendingMain.price),
      image: resolveMediaUrl(trendingMain.imageUrl),
      description: trendingMain.description,
      badgeText: trendingMain.badgeLabel,
      badgeColor: trendingMain.badgeColor === "red" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
    });
  };

  const handleAddTrendingSide = () => {
    addToCart({
      id: "trending-side",
      title: trendingSide.title,
      price: parseFloat(trendingSide.price),
      image: resolveMediaUrl(trendingSide.imageUrl),
      description: trendingSide.description,
      badgeText: trendingSide.badgeLabel,
      badgeColor: trendingSide.badgeColor === "red" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
    });
  };

  const handleAddSignature = (item, idx) => {
    addToCart({
      id: `signature-${idx}`,
      title: item.title,
      price: parseFloat(item.price),
      image: resolveMediaUrl(item.img),
      description: item.desc,
      badgeText: "",
      badgeColor: ""
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] font-sans selection:bg-[#C82333] selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-12 space-y-16">
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-lg group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={resolveMediaUrl(heroBanner.imageUrl)}
            alt={heroBanner.alt || "Hero Banner"}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-y-0 left-0 pl-8 md:pl-16 lg:pl-24 pr-8 max-w-2xl flex flex-col justify-center">
            <div className="bg-[#C82333] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded inline-block w-max mb-5">
              {heroBanner.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white leading-[1.1] mb-5 tracking-tight">
              {heroBanner.heading}
            </h1>
            <p className="text-gray-200 text-sm md:text-base font-light mb-8 max-w-sm leading-relaxed">
              {heroBanner.description}
            </p>
            <button className="bg-[#C82333] text-white font-medium px-8 py-3 rounded-lg w-max hover:bg-red-700 transition-colors shadow-lg">
              {heroBanner.ctaText}
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-6 h-1 bg-white/40 rounded-full hover:bg-white/60 cursor-pointer transition-colors"></div>
            <div className="w-6 h-1 bg-white/40 rounded-full hover:bg-white/60 cursor-pointer transition-colors"></div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-[2px] bg-[#C82333]"></div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{t("pages.homeStandalone.inspiration")}</h2>
          </div>

          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                <div className="w-[88px] h-[88px] rounded-full overflow-hidden mb-3 border-[3px] border-transparent group-hover:border-[#C82333] transition-all duration-300 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveMediaUrl(cat.img)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#C82333] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRENDING DELICACIES SECTION */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[10px] font-bold text-[#C82333] uppercase tracking-widest mb-1">{t("pages.homeStandalone.topPicks")}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{t("pages.homeStandalone.trendingDelicacies")}</h2>
            </div>
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 group">
              {t("pages.homeStandalone.exploreAll")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Trending Card */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="md:w-[55%] relative h-64 md:h-auto min-h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resolveMediaUrl(trendingMain.imageUrl)} alt={trendingMain.alt || "Trending Main"} className="w-full h-full object-cover" />
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="text-amber-500 text-[10px]">★</span>
                  <span className="text-xs font-bold text-gray-900">{trendingMain.rating} <span className="text-gray-400 font-medium">{trendingMain.ratingCount}</span></span>
                </div>
              </div>
              
              <div className="md:w-[45%] p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-4 h-4 border ${trendingMain.badgeColor === "red" ? "border-red-500" : "border-green-500"} flex items-center justify-center p-[2px] rounded-sm`}>
                    <div className={`w-2 h-2 rounded-full ${trendingMain.badgeColor === "red" ? "bg-red-500" : "bg-green-500"}`}></div>
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${trendingMain.badgeColor === "red" ? "text-red-600" : "text-green-600"}`}>{trendingMain.badgeLabel}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">{trendingMain.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow">
                  {trendingMain.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${trendingMain.price}</span>
                  <button onClick={handleAddTrendingMain} className="bg-[#C82333] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center hover:bg-red-700 transition-colors shadow-sm active:scale-95">
                    <Plus className="w-4 h-4 mr-1.5" /> {trendingMain.ctaText}
                  </button>
                </div>
              </div>
            </div>

            {/* Sub Trending Card */}
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="w-full h-[55%] min-h-[220px] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resolveMediaUrl(trendingSide.imageUrl)} alt={trendingSide.alt || "Trending Side"} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-4 h-4 border ${trendingSide.badgeColor === "green" ? "border-green-500" : "border-red-500"} flex items-center justify-center p-[2px] rounded-sm`}>
                    <div className={`w-2 h-2 rounded-full ${trendingSide.badgeColor === "green" ? "bg-green-500" : "bg-red-500"}`}></div>
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${trendingSide.badgeColor === "green" ? "text-green-600" : "text-red-600"}`}>{trendingSide.badgeLabel}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trendingSide.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-grow">
                  {trendingSide.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-gray-900">${trendingSide.price}</span>
                  <button onClick={handleAddTrendingSide} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 active:scale-95">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SIGNATURE MENU SECTION */}
        <section className="pt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">{t("pages.homeStandalone.signatureMenu")}</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {menuTabs.map((tab, idx) => (
                <button 
                  key={tab} 
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    idx === 0 
                    ? 'bg-[#C82333] text-white shadow-sm' 
                    : 'bg-[#EFEFEF] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {signatureMenu.map((item, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => handleAddSignature(item, idx)}>
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-4 shadow-sm border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveMediaUrl(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm">
                    ${item.price}
                  </div>
                  {/* Hover Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Plus className="w-4 h-4" /> {t("add_to_order")}
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-[15px] mb-1 leading-tight group-hover:text-[#C82333] transition-colors">{item.title}</h4>
                <p className="text-[13px] text-gray-500 leading-snug line-clamp-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto w-max">
            <button className="bg-white border border-gray-200 text-gray-900 font-medium text-sm px-6 py-3 rounded-xl flex items-center hover:bg-gray-50 transition-colors shadow-sm">
              {t("pages.homeStandalone.viewFullMenu")} <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </section>

      </main>

      <CustomFooter />
      
      {/* Hide default scrollbar completely internally for a cleaner look if possible, but global styles usually dictate it */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
