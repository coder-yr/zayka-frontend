"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEventBus, saveLiveOrders, loadLiveOrders } from "@/lib/orderEventBus";

// Helper for local storage backup (offline-first architecture)
const getLocalStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    return fallback;
  }
};

const setLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

// Mock product seed if backend fails to connect
const MOCK_PRODUCTS = [
  { id: "p1", name: "Paneer Butter Masala", price: 280, category: "Mains", isAvailable: true, stock: 45, sku: "MA-PBM-01" },
  { id: "p2", name: "Garlic Naan", price: 60, category: "Mains", isAvailable: true, stock: 120, sku: "MA-GN-02" },
  { id: "p3", name: "Veg Dum Biryani", price: 320, category: "Mains", isAvailable: true, stock: 30, sku: "MA-VDB-03" },
  { id: "p4", name: "Crispy Spring Rolls", price: 180, category: "Starters", isAvailable: true, stock: 40, sku: "ST-CSR-01" },
  { id: "p5", name: "Tandoori Paneer Tikka", price: 240, category: "Starters", isAvailable: true, stock: 25, sku: "ST-TPT-02" },
  { id: "p6", name: "Gulab Jamun", price: 90, category: "Desserts", isAvailable: true, stock: 80, sku: "DE-GJ-01" },
  { id: "p7", name: "Warm Chocolate Lava Cake", price: 180, category: "Desserts", isAvailable: true, stock: 20, sku: "DE-CLC-02" },
  { id: "p8", name: "Mango Lassi", price: 120, category: "Beverages", isAvailable: true, stock: 65, sku: "BE-ML-01" },
  { id: "p9", name: "Iced Peach Tea", price: 95, category: "Beverages", isAvailable: true, stock: 70, sku: "BE-IPT-02" },
  { id: "p10", name: "Fresh Caesar Salad", price: 210, category: "Starters", isAvailable: true, stock: 15, sku: "ST-CS-03" },
];

const MOCK_TABLES = [
  { id: "t1", tableNumber: "T1", capacity: 2, status: "occupied", floor: "Ground", section: "Main Dining" },
  { id: "t2", tableNumber: "T2", capacity: 4, status: "available", floor: "Ground", section: "Main Dining" },
  { id: "t3", tableNumber: "T3", capacity: 4, status: "reserved", floor: "Ground", section: "Window Side" },
  { id: "t4", tableNumber: "T4", capacity: 6, status: "available", floor: "Rooftop", section: "Terrace" },
  { id: "t5", tableNumber: "T5", capacity: 2, status: "occupied", floor: "Rooftop", section: "Terrace" },
  { id: "t6", tableNumber: "T6", capacity: 8, status: "available", floor: "First Floor", section: "VIP Cabin" },
];

export default function PosDashboard() {
  // Authentication PIN screen
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  // POS State
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [tables, setTables] = useState(MOCK_TABLES);
  const [selectedTable, setSelectedTable] = useState("Takeaway");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [taxRate, setTaxRate] = useState(5); // 5% standard, or 18% bar/premium
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [authToken, setAuthToken] = useState("");

  // Modals / Drawers
  const [showTableModal, setShowTableModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Search input ref for keyboard focus
  const searchInputRef = useRef(null);

  // Split billing state
  const [splitCount, setSplitCount] = useState(2);
  const [customSplitAmounts, setCustomSplitAmounts] = useState([]);

  // CMS/Add product state
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Mains", description: "", stock: 50 });

  // Complete transactions list
  const [transactions, setTransactions] = useState([]);

  // Current Time Ticker
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products & tables on mount and backup locally
  useEffect(() => {
    const loadData = async () => {
      // Sync local transactions on start
      setTransactions(getLocalStorage("zayka_pos_transactions", []));
      
      // Auto-login to the backend as cashier/admin
      try {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "admin@zayka.com", password: "adminpassword" }),
        });
        if (loginRes.ok) {
          const loginData = await loginRes.json();
          setAuthToken(loginData.token);
          setOnlineStatus(true);

          // Load products
          const prodRes = await fetch("/api/products", {
            headers: { Authorization: `Bearer ${loginData.token}` },
          });
          if (prodRes.ok) {
            const prodData = await prodRes.json();
            setProducts(prodData.products || MOCK_PRODUCTS);
          }

          // Load tables
          const tabRes = await fetch("/api/tables", {
            headers: { Authorization: `Bearer ${loginData.token}` },
          });
          if (tabRes.ok) {
            const tabData = await tabRes.json();
            setTables(tabData || MOCK_TABLES);
          }
        } else {
          setOnlineStatus(false);
        }
      } catch (err) {
        console.warn("Backend server not responding, operating in Offline/Fallback mode.", err);
        setOnlineStatus(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Keyboard Shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isAuthenticated) return;

      if (e.key === "F4") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "F2") {
        e.preventDefault();
        handleCheckout();
      } else if (e.key === "F7") {
        e.preventDefault();
        setShowTableModal(prev => !prev);
      } else if (e.key === "Escape") {
        setShowTableModal(false);
        setShowProductModal(false);
        setShowHistoryModal(false);
        setShowSplitModal(false);
        setActiveReceipt(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated, cart, selectedTable, paymentMethod, taxRate, discountPercent, notes, appliedCoupon]);

  // PIN Login validation
  const handlePinInput = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        // Validation code (preset pin: 1234)
        if (nextPin === "1234") {
          setIsAuthenticated(true);
          setPinError("");
        } else {
          setPinError("Invalid Passcode. Please try again.");
          setPin("");
        }
      }
    }
  };

  const clearPin = () => {
    setPin("");
    setPinError("");
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const taxAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return (taxable * taxRate) / 100;
  }, [subtotal, discountAmount, taxRate]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount) + taxAmount;
  }, [subtotal, discountAmount, taxAmount]);

  // Apply Coupon
  const handleApplyCoupon = () => {
    const promo = couponInput.toUpperCase();
    if (promo === "ZAYKA20") {
      setDiscountPercent(20);
      setAppliedCoupon("ZAYKA20 (20%)");
      setPinError("");
    } else if (promo === "ZAYKA10") {
      setDiscountPercent(10);
      setAppliedCoupon("ZAYKA10 (10%)");
      setPinError("");
    } else {
      alert("Invalid coupon code. Try ZAYKA10 or ZAYKA20.");
    }
    setCouponInput("");
  };

  // Split bill helper calculation
  const splitShares = useMemo(() => {
    const share = totalAmount / splitCount;
    return Array(splitCount).fill(share);
  }, [totalAmount, splitCount]);

  // Checkout submission
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add products to proceed.");
      return;
    }

    const receiptId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const tableNum = typeof selectedTable === "object" ? selectedTable.tableNumber : selectedTable;

    const orderData = {
      orderNumber: receiptId,
      tableId: typeof selectedTable === "object" ? selectedTable.id : null,
      tableName: tableNum,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price
      })),
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      couponCode: appliedCoupon || null,
      paymentMethod,
      notes,
      cashier: "Jane Cashier",
      date: new Date().toISOString()
    };

    // Attempt to post to backend
    if (onlineStatus && authToken) {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({
            tableId: orderData.tableId,
            totalAmount: orderData.totalAmount,
            discountAmount: orderData.discountAmount,
            taxAmount: orderData.taxAmount,
            paymentMethod: orderData.paymentMethod,
            notes: orderData.notes,
            items: cart.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              unitPrice: item.price
            }))
          })
        });

        // Update table status locally/remotely
        if (orderData.tableId) {
          await fetch(`/api/tables/${orderData.tableId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ status: "occupied" })
          });
        }
      } catch (err) {
        console.warn("API write failed, saving to local transactions store.", err);
      }
    }

    // Save transaction locally
    const updatedTransactions = [orderData, ...transactions];
    setTransactions(updatedTransactions);
    setLocalStorage("zayka_pos_transactions", updatedTransactions);

    // Update local table occupied state
    if (typeof selectedTable === "object") {
      setTables(prev => prev.map(t => t.id === selectedTable.id ? { ...t, status: "occupied" } : t));
    }

    // Broadcast to Kitchen Display via event bus
    const bus = getEventBus();
    if (bus) {
      bus.emit("order:new", orderData);

      // Also persist to KDS live orders store
      const existingKdsOrders = loadLiveOrders();
      const kdsOrder = { ...orderData, status: "pending", createdAt: orderData.date, timeline: [{ status: "pending", at: orderData.date }] };
      saveLiveOrders([kdsOrder, ...existingKdsOrders]);
    }

    // Trigger Receipt modal
    setActiveReceipt(orderData);

    // Reset current Order Cart
    setCart([]);
    setNotes("");
    setDiscountPercent(0);
    setAppliedCoupon("");
    setSelectedTable("Takeaway");
  };

  // Create Product mock CMS
  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required!");
      return;
    }
    const created = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      stock: parseInt(newProduct.stock || 50),
      isAvailable: true,
      sku: `MA-CMS-${Math.floor(100+Math.random()*900)}`
    };

    setProducts(prev => [created, ...prev]);
    setShowProductModal(false);
    setNewProduct({ name: "", price: "", category: "Mains", description: "", stock: 50 });
  };

  // Filter products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const totalSales = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const taxesCollected = transactions.reduce((sum, t) => sum + t.taxAmount, 0);
    const count = transactions.length;
    const avgBill = count > 0 ? totalSales / count : 0;
    return { totalSales, taxesCollected, count, avgBill };
  }, [transactions]);

  // Layout rendering starts here
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center font-sans text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="w-full max-w-md p-8 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center space-y-8 z-10">
          <div className="text-center space-y-2">
            <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block">Zayka POS Console</span>
            <h1 className="text-3xl font-extrabold tracking-tight">Staff Terminal Authentication</h1>
            <p className="text-zinc-400 text-xs">Enter your 4-digit security PIN to access the terminal</p>
          </div>

          {/* PIN Indicators */}
          <div className="flex justify-center space-y-2 flex-col items-center w-full">
            <div className="flex gap-4 mb-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border border-zinc-700 transition-all duration-200 ${
                    pin.length > index ? "bg-primary scale-110 shadow-lg shadow-primary/30" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
            {pinError && <span className="text-rose-500 text-xs font-bold animate-pulse">{pinError}</span>}
          </div>

          {/* Numeric Touchpad */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePinInput(num.toString())}
                className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-700/80 active:scale-95 text-xl font-bold flex items-center justify-center transition-all"
              >
                {num}
              </button>
            ))}
            <button
              onClick={clearPin}
              className="w-16 h-16 rounded-full bg-rose-950/40 border border-rose-800/30 hover:bg-rose-900/60 text-sm font-black text-rose-400 flex items-center justify-center transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => handlePinInput("0")}
              className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-700/80 text-xl font-bold flex items-center justify-center transition-all"
            >
              0
            </button>
            <div className="w-16 h-16 flex items-center justify-center text-zinc-600 text-xs font-bold">
              PIN: 1234
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* Top Header bar */}
      <header className="h-16 shrink-0 bg-zinc-900/80 border-b border-zinc-800/80 px-6 flex items-center justify-between backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="text-lg font-black tracking-wider uppercase bg-gradient-to-r from-rose-500 to-amber-500 text-transparent bg-clip-text">ZAYKA POS</span>
          </div>
          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold">V2.4 PRO</span>
        </div>

        {/* Live Date/Time & Online Toggle */}
        <div className="flex items-center gap-6">
          <div className="text-zinc-400 text-xs font-mono tracking-wider hidden md:block">
            {currentTime}
          </div>

          {/* Connection Status indicator */}
          <button
            onClick={() => setOnlineStatus(!onlineStatus)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              onlineStatus ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/30" : "bg-rose-950/60 text-rose-400 border border-rose-800/30"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlineStatus ? "bg-emerald-400 animate-ping" : "bg-rose-400"}`} />
            <span>{onlineStatus ? "Server Online" : "Local Fallback"}</span>
          </button>

          {/* Action Drawer Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistoryModal(true)}
              className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
            >
              <span>📊</span> History
            </button>
            <button
              onClick={() => setShowTableModal(true)}
              className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
            >
              <span>🪑</span> Floor Map <kbd className="text-[9px] text-zinc-500 bg-zinc-950 px-1 ml-1 rounded">F7</kbd>
            </button>
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 active:scale-95 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
            >
              <span>🍽️</span> CMS Add
            </button>
            <a
              href="/pos/kitchen"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-950/40 hover:bg-orange-950/60 text-orange-400 border border-orange-800/30 active:scale-95 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
            >
              <span>👨‍🍳</span> Kitchen KDS
            </a>
            <a
              href="/pos/waiter"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-950/40 hover:bg-blue-950/60 text-blue-400 border border-blue-800/30 active:scale-95 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all"
            >
              <span>🍽️</span> Waiter
            </a>
          </div>
        </div>
      </header>

      {/* Main split work console */}
      <section className="flex-1 flex overflow-hidden">
        {/* Left Side: Product Selection Grid */}
        <div className="flex-1 flex flex-col bg-zinc-950 p-6 overflow-hidden border-r border-zinc-900">
          
          {/* Search bar & Category filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Scan SKU or search dishes... (Press F4)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder-zinc-500"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
              </div>

              {/* Table assignment shortcut indicator */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 flex items-center gap-2 shrink-0">
                <span className="text-xs text-zinc-400 font-medium">Table Assignment:</span>
                <span className="text-xs font-black text-amber-400">
                  {typeof selectedTable === "object" ? `${selectedTable.tableNumber} (${selectedTable.section})` : "Takeaway / Delivery"}
                </span>
              </div>
            </div>

            {/* Horizontal Categories Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {["All", "Starters", "Mains", "Desserts", "Beverages"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Scroll container */}
          <div className="flex-1 overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="bg-zinc-900 hover:bg-zinc-800/70 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all flex flex-col justify-between h-36"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold leading-snug line-clamp-2 text-white">{product.name}</h4>
                          <span className="text-[9px] font-semibold text-zinc-500 shrink-0">{product.sku}</span>
                        </div>
                        <p className="text-zinc-500 text-[10px] line-clamp-1">{product.category}</p>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-800/60">
                        <span className="text-sm font-black text-rose-400">₹{product.price}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          product.stock < 30 ? "bg-amber-950/40 text-amber-400" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {product.stock} in stock
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                  <span className="text-3xl mb-2">🍽️</span>
                  <span className="text-sm font-bold">No matching products found</span>
                  <span className="text-xs text-zinc-600 mt-1">Try changing category or query</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Active Cart & Billing Console */}
        <div className="w-[380px] bg-zinc-900/60 border-l border-zinc-900 flex flex-col overflow-hidden shrink-0">
          
          {/* Cart Header info */}
          <div className="p-4 border-b border-zinc-900 bg-zinc-900/80 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs text-zinc-400 font-bold block">Current Order Basket</span>
              <span className="text-[10px] text-zinc-500">Items will be locked to Table on checkout</span>
            </div>
            <button
              onClick={() => setCart([])}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Scroll list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-3 flex justify-between items-center gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white block">{item.name}</span>
                    <span className="text-[10px] text-rose-400 font-black">₹{item.price} each</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-7 h-7 text-xs hover:bg-zinc-800 active:scale-95 font-bold flex items-center justify-center text-zinc-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-7 h-7 text-xs hover:bg-zinc-800 active:scale-95 font-bold flex items-center justify-center text-zinc-400"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-rose-400 text-sm transition-colors"
                      title="Remove item"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-16">
                <span className="text-4xl mb-3">🛒</span>
                <span className="text-xs font-bold">POS Cart is Empty</span>
                <span className="text-[10px] text-zinc-600 text-center px-6 mt-1">Select items from the product catalog to begin billing</span>
              </div>
            )}
          </div>

          {/* Kitchen notes, split billing & promo coupon */}
          <div className="p-4 border-t border-zinc-900 bg-zinc-900/40 space-y-4">
            {/* Coupon & Notes row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-400 font-bold block mb-1 uppercase tracking-wider">Promo Coupon</label>
                <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-1">
                  <input
                    type="text"
                    placeholder="ZAYKA20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-transparent text-[10px] font-bold px-2 py-1 text-white focus:outline-none focus:ring-0 placeholder-zinc-600"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-zinc-800 text-[10px] font-black text-white px-2 py-1 rounded-lg hover:bg-zinc-700"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 font-bold block mb-1 uppercase tracking-wider">Kitchen Notes</label>
                <input
                  type="text"
                  placeholder="Extra spicy, no onions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-zinc-700 placeholder-zinc-600 font-medium"
                />
              </div>
            </div>

            {/* Split bill & Tax rates configs */}
            <div className="flex justify-between items-center gap-4 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold block">Split Invoice</span>
                <button
                  onClick={() => setShowSplitModal(true)}
                  disabled={cart.length === 0}
                  className="text-xs text-amber-400 font-bold hover:underline disabled:opacity-50"
                >
                  Configure Split ➔
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold block">Live GST Rate</span>
                <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setTaxRate(5)}
                    className={`px-2 py-0.5 rounded text-[9px] font-black transition-all ${
                      taxRate === 5 ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    5%
                  </button>
                  <button
                    onClick={() => setTaxRate(18)}
                    className={`px-2 py-0.5 rounded text-[9px] font-black transition-all ${
                      taxRate === 18 ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    18%
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtotal, discounts, taxes & payment calculations */}
          <div className="bg-zinc-950 p-4 border-t border-zinc-900 space-y-3 font-mono">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Discount ({appliedCoupon || `${discountPercent}%`}):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-zinc-400">
              <span>GST ({taxRate}%):</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-white border-t border-dashed border-zinc-800 pt-3">
              <span>Total Payable:</span>
              <span className="text-xl text-rose-400">₹{totalAmount.toFixed(2)}</span>
            </div>

            {/* Payment Method selector buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {["cash", "card", "upi"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                    paymentMethod === method
                      ? "bg-amber-400 border-amber-400 text-zinc-950 font-black shadow-md shadow-amber-400/10"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {method === "upi" ? "UPI / Scan" : method}
                </button>
              ))}
            </div>

            {/* Final Action Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-3 px-4 rounded-xl text-xs uppercase tracking-widest mt-4 transition-all hover:shadow-lg hover:shadow-primary/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <span>💳 Pay & Print Receipt</span>
              <kbd className="text-[10px] text-rose-200 bg-rose-900/60 px-1.5 py-0.5 rounded font-mono hidden md:inline-block">F2</kbd>
            </button>
          </div>
        </div>
      </section>

      {/* Table Map Floor Modal */}
      <AnimatePresence>
        {showTableModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>🪑</span> Restaurant Layout Floor Map
                  </h2>
                  <p className="text-zinc-500 text-xs">Assign a table to active order session. Green = Available; Yellow = Reserved; Red = Occupied.</p>
                </div>
                <button
                  onClick={() => setShowTableModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Table Maps Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {tables.map((table) => {
                  let statusBg = "border-emerald-600/30 bg-emerald-950/20 text-emerald-400";
                  if (table.status === "occupied") statusBg = "border-rose-600/30 bg-rose-950/20 text-rose-400";
                  if (table.status === "reserved") statusBg = "border-amber-600/30 bg-amber-950/20 text-amber-400";

                  const isCurrentlyAssigned = typeof selectedTable === "object" && selectedTable.id === table.id;

                  return (
                    <div
                      key={table.id}
                      onClick={() => {
                        setSelectedTable(table);
                        setShowTableModal(false);
                      }}
                      className={`border-2 rounded-2xl p-5 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex flex-col justify-between h-40 ${statusBg} ${
                        isCurrentlyAssigned ? "ring-2 ring-primary ring-offset-2 ring-offset-zinc-900 border-primary" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-lg font-black">{table.tableNumber}</span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-zinc-950/60 rounded-full font-sans tracking-wide">
                          {table.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Floor:</span>
                          <span className="font-semibold text-zinc-300">{table.floor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Section:</span>
                          <span className="font-semibold text-zinc-300">{table.section}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Capacity:</span>
                          <span className="font-semibold text-zinc-300">{table.capacity} Guests</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setSelectedTable("Takeaway");
                    setShowTableModal(false);
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider"
                >
                  Reset to Takeaway
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Split Bill Modal */}
      <AnimatePresence>
        {showSplitModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold text-white">💰 Split Billing Calculator</h2>
                  <p className="text-zinc-500 text-xs">Split the total invoice of ₹{totalAmount.toFixed(2)} among guests</p>
                </div>
                <button
                  onClick={() => setShowSplitModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Slider for count of splits */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-zinc-400">
                  <span>Number of Guests:</span>
                  <span className="text-amber-400 text-sm font-black">{splitCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={splitCount}
                  onChange={(e) => setSplitCount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Shares output list */}
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {splitShares.map((share, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex justify-between items-center"
                  >
                    <span className="text-xs font-bold text-zinc-400 font-mono">Guest #{idx + 1} Share:</span>
                    <span className="text-sm font-black text-white font-mono">₹{share.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowSplitModal(false)}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Close Calculator
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Ledger & Sales KPIs Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-white">📈 POS Sales History & Dashboard KPIs</h2>
                  <p className="text-zinc-500 text-xs">Overview of today's completed transactions and sales performance indicators.</p>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Total Revenue</span>
                  <span className="text-2xl font-black text-rose-400 font-mono">₹{metrics.totalSales.toFixed(2)}</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Taxes Collected</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">₹{metrics.taxesCollected.toFixed(2)}</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Completed Tickets</span>
                  <span className="text-2xl font-black text-white font-mono">{metrics.count} Orders</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Average Bill Size</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">₹{metrics.avgBill.toFixed(2)}</span>
                </div>
              </div>

              {/* Transactions Ledger Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Completed Invoice Logs</h3>
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-bold">
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Date/Time</th>
                        <th className="p-4">Table</th>
                        <th className="p-4">Subtotal</th>
                        <th className="p-4">Discount</th>
                        <th className="p-4">Total Paid</th>
                        <th className="p-4">Method</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <tr key={tx.orderNumber} className="hover:bg-zinc-900/40 text-zinc-300">
                            <td className="p-4 font-mono font-bold text-white">{tx.orderNumber}</td>
                            <td className="p-4">{new Date(tx.date).toLocaleString()}</td>
                            <td className="p-4 font-bold text-amber-400">{tx.tableName}</td>
                            <td className="p-4 font-mono">₹{tx.subtotal.toFixed(2)}</td>
                            <td className="p-4 font-mono text-emerald-400">-₹{tx.discountAmount.toFixed(2)}</td>
                            <td className="p-4 font-mono font-black text-rose-400">₹{tx.totalAmount.toFixed(2)}</td>
                            <td className="p-4 uppercase font-bold text-[10px]">{tx.paymentMethod}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => setActiveReceipt(tx)}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded-lg text-[10px] uppercase"
                              >
                                View Receipt
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-zinc-600 font-bold">
                            No transactions recorded in current session.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Product CMS Modal */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold text-white">🍽️ Add New Product (CMS Sync)</h2>
                  <p className="text-zinc-500 text-xs">Instantly add a new dish to the local and simulated backend menus.</p>
                </div>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                    placeholder="e.g. Garlic Naan"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                      placeholder="60"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                    >
                      <option value="Starters">Starters</option>
                      <option value="Mains">Mains</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Stock Count</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700"
                    placeholder="50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-700 h-20 resize-none"
                    placeholder="Brief description of the recipe..."
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Create Product
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Retro Thermal Receipt Pop-up Modal */}
      <AnimatePresence>
        {activeReceipt && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-sm space-y-6 flex flex-col items-center"
            >
              {/* Retro Receipt Box */}
              <div className="w-full bg-zinc-50 text-zinc-900 p-6 rounded-xl border border-zinc-200 shadow-inner font-mono text-[10px] leading-relaxed select-all">
                <div className="text-center space-y-1 pb-4 border-b border-dashed border-zinc-400">
                  <h3 className="text-xs font-black tracking-widest uppercase">*** ZAYKA RESTAURANT ***</h3>
                  <p className="font-semibold">Plot 12, Cyber Hub, Sector-24</p>
                  <p className="font-semibold">Tel: +91 98765 43210</p>
                  <p className="text-[9px]">GstNo: 07AAAAA1111A1Z1</p>
                </div>

                <div className="py-3 border-b border-dashed border-zinc-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Ticket ID:</span>
                    <span className="font-bold">{activeReceipt.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date/Time:</span>
                    <span>{new Date(activeReceipt.date).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cashier:</span>
                    <span>{activeReceipt.cashier}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Table Ref:</span>
                    <span className="text-zinc-950">{activeReceipt.tableName}</span>
                  </div>
                </div>

                {/* Items headers */}
                <div className="py-3 border-b border-dashed border-zinc-400">
                  <div className="flex justify-between font-bold pb-2">
                    <span className="w-[50%]">Item Description</span>
                    <span className="w-[15%] text-right">Qty</span>
                    <span className="w-[15%] text-right">Rate</span>
                    <span className="w-[20%] text-right">Amt</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeReceipt.items.map((item) => (
                      <div key={item.productId} className="flex justify-between">
                        <span className="w-[50%] truncate font-bold">{item.name}</span>
                        <span className="w-[15%] text-right font-bold">{item.quantity}</span>
                        <span className="w-[15%] text-right">₹{item.unitPrice}</span>
                        <span className="w-[20%] text-right font-bold">₹{(item.quantity * item.unitPrice).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals & Tax lines */}
                <div className="py-3 border-b border-dashed border-zinc-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{activeReceipt.subtotal.toFixed(2)}</span>
                  </div>
                  {activeReceipt.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Promo Discount:</span>
                      <span>-₹{activeReceipt.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>CGST ({taxRate === 18 ? "9%" : "2.5%"}):</span>
                    <span>₹{(activeReceipt.taxAmount / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST ({taxRate === 18 ? "9%" : "2.5%"}):</span>
                    <span>₹{(activeReceipt.taxAmount / 2).toFixed(2)}</span>
                  </div>
                </div>

                <div className="py-3 text-center space-y-1.5">
                  <div className="flex justify-between font-black text-xs text-zinc-950 pb-1">
                    <span>TOTAL AMOUNT PAID:</span>
                    <span>₹{activeReceipt.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-[9px] uppercase font-bold bg-zinc-200/60 py-1 rounded">
                    Payment Method: [{activeReceipt.paymentMethod}]
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-3 border-t border-dashed border-zinc-400 flex flex-col items-center gap-2">
                  <div className="w-full h-8 bg-zinc-900/10 flex justify-between overflow-hidden opacity-85 px-4 py-1">
                    {Array(45).fill(0).map((_, i) => (
                      <div
                        key={i}
                        className="h-full bg-zinc-900"
                        style={{ width: `${(i % 3 === 0 ? 1 : i % 5 === 0 ? 3 : 2)}px` }}
                      />
                    ))}
                  </div>
                  <p className="text-[8px] font-bold text-center">Thank you for dining at Zayka Restaurant!</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end w-full">
                <button
                  onClick={() => setActiveReceipt(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider w-full"
                >
                  Done / Close
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider w-full"
                >
                  Print Invoice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
