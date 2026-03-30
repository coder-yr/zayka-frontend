"use client";
import { useState,useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Utensils, Coffee, IceCream, Cake, Beer, Pizza, Store } from "lucide-react";
import Link from "next/link";

const Navbar = ({ toggleTheme, theme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  

  return (
    <nav className="w-full fixed px-8 py-4 z-50 shadow-gradient-pink bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="font-bold text-2xl">
          <Link href="/">
            Zayaka<span className="italic underline">pos</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-black dark:text-white font-medium">
          <NavItem
            title="Features"
            options={[
              { name: "POS System", path: "/features/pos" },
              { name: "Inventory", path: "/features/inventory" },
              { name: "Analytics", path: "/features/analytics" },
            ]}
          />
          <NavItem title="Pricing" path="/pricing" noDropdown />
          <NavItem title="Our Products" isMultiColumn />
          <NavItem title="Outlet Types" isMultiColumn1 />
          <NavItem title="Become a Partner" path="/partner" noDropdown />
          <NavItem title="Contact Us" path="/contact" noDropdown />
        </div>
        {/* Dark Mode Toggle */}
        {/* <div className="ms-auto shrink hidden lg:inline-flex gap-4"> */}
        <label className="relative flex cursor-pointer items-center">
  <input
    type="checkbox"
    checked={theme === "dark"}
    onChange={toggleTheme}
    className="sr-only peer"
  />
  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-[#E80F88] transition-all relative">
    <div className={`w-5 h-5 bg-white dark:bg-gray-600 rounded-full absolute top-0.5 transition-all duration-300 ${theme === "dark" ? "right-1" : "left-1"}`}></div>
  </div>
</label>
        {/* </div> */}
        {/* Button */}
        <div>
        <Link href="/book-demo">
          <button className="border border-[#E80F88] px-6 py-2 rounded-md font-medium hidden md:block">
            Book A Demo
          </button>
        </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-md mt-4 p-4 space-y-3">
          <NavItem title="Features" options={[
            "POS System", "Inventory", "Analytics"
          ]} mobile />
          <NavItem title="Pricing" path="/pricing" noDropdown mobile />
          <NavItem title="Our Products" isMultiColumn mobile />
          <NavItem title="Outlet Types" isMultiColumn mobile />
          <NavItem title="Become a Partner" path="/become-a-partner" noDropdown mobile />
          <NavItem title="Contact Us" path="/contact" noDropdown mobile />
          <Link href="/book-demo">
            <button className="border border-[#E80F88] px-6 py-2 rounded-md font-medium w-full">
              Book A Demo
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

// Dropdown Menu Item Component
const NavItem = ({ title, options, path, isMultiColumn, isMultiColumn1, noDropdown, mobile }) => {
  const [open, setOpen] = useState(false);

  // Categories for the multi-column dropdown
  const categories = {
    "Stock And Account Book": [
      "Autoparts", "Electrical", "Kirana/Grocery", "Building Materials", "Transport & Courier",
      "Import/Export", "Sweets Shop", "Fertilizers", "Wine Shop", "Hardwares"
    ],
    "Stock And Account Book Barcode": [
      "Automobiles", "Mart/Supermart", "Medical/Pharmacy", "Apparel Clothing", "Clothing/Garments",
      "Mobiles & Accessories", "Computer & Accessories", "Shoe/Footwear & Accessories",
      "Electronics & Home Applicances", "Kirana & Departmental Stores"
    ],
    "Jewellery": [
      "Gold Jeweller", "Silver Jeweller", "Diamond Jeweller", "Platinum Jeweller", "Fashion Jewellery"
    ],
    "Industries": [
      "Textile Industry", "Disposal Industry", "Perfumes Industry", "Pharmaceutical Industry",
      "Food & Beverages Industry", "Electrical Industry", "Autoparts Industry", "Kirana/Grocery Industry",
      "Building Materials Industry"
    ]
  };
  const categories1 = {
    "Restaurants & Cafes": [
      { name: "Fine Dine", icon: Utensils, path: "/outlets/fine-dine" },
      { name: "QSR", icon: Store, path: "/outlets/qsr" },
      { name: "Cafe", icon: Coffee, path: "/outlets/cafe" },
      { name: "Food Court", icon: Store, path: "/outlets/food-court" },
      { name: "Kitchen", icon: Utensils, path: "/outlets/kitchen" },
    ],
    "Specialty Outlets": [
      { name: "IceCream Desserts", icon: IceCream, path: "outlets/icecream-desserts" },
      { name: "Bakery", icon: Cake, path: "outlets/bakery" },
      { name: "Bar and Brewery", icon: Beer, path: "outlets/bar-brewery" },
      { name: "Pizzeria", icon: Pizza, path: "outlets/pizzeria" },
      { name: "Large Chain", icon: Store, path: "outlets/large-chain" },
    ],
  };


  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => !mobile && setOpen(true)}
      onMouseLeave={() => !mobile && setOpen(false)}
    >
      {path ? (
        <Link href={path} className={`flex items-center transition-colors duration-300 hover:text-[#E80F88] ${mobile ? "py-2 border-b" : ""}`}>
          {title}
        </Link>
      ) : (
        <div
          className={`flex items-center justify-between transition-colors duration-300 hover:text-[#E80F88] ${mobile ? "py-2 border-b" : ""}`}
          onClick={() => mobile && options && setOpen(!open)}
        >
          <span>{title}</span>
          {!noDropdown && (options || isMultiColumn || isMultiColumn1) && <ChevronDown size={16} />}
        </div>
      )}

      {/* Standard Dropdown */}
      {!noDropdown && options && open && (
        <div className="absolute md:top-full left-0 bg-white shadow-md rounded-md p-2 w-40">
          {options.map((option, index) => (
            <Link
              key={index}
              href={
                typeof option === "string"
                  ? `/${option.toLowerCase().replace(/\s+/g, "-")}`
                  : option.path
              }
              className="block px-4 py-2 transition-colors duration-300 hover:text-[#E80F88]"
            >
              {typeof option === "string" ? option : option.name}
            </Link>
          ))}
        </div>
      )}

      {/* Multi-column Dropdown */}
      {!noDropdown && isMultiColumn && open && (
        <div className="absolute left-0 mt-2 left-1/3 transform -translate-x-1/3 mt-2 w-screen h-[55vh] px-10 pt-2 bg-white flex flex-row justify-between shadow-lg overflow-auto z-50">
          {Object.entries(categories).map(([category, items], index) => (
            <div key={index} className="w-[22%] font-bold text-md">
              <h1 className="font-sans text-appColor">{category}</h1>
              <hr className="text-appColor" />
              {items.map((item, i) => (
                <div key={i} className="mt-2">
                  <a
                    href={
                      typeof item === "string"
                        ? `/${item.toLowerCase().replace(/\s+/g, "-")}`
                        : item.path
                    }
                    className="text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-[#E80F88]"
                  >
                    {typeof item === "string" ? item : item.name}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {!noDropdown && isMultiColumn1 && open && (
        <div className="absolute left-0 mt-2 w-[45vw] px-12 py-8 bg-white rounded-lg flex justify-between shadow-lg overflow-auto z-50 transition-all duration-300">
          {Object.entries(categories1).map(([category, items], index) => (
            <div key={index} className="w-[45%]">
              <h1 className="font-bold text-appColor text-lg flex items-center gap-2">
                {category}
              </h1>
              <hr className="border-appColor mb-2" />
              {items.map((item, i) => (
                <div key={i} className="mt-3 flex items-center gap-4">
                  <item.icon className="w-8 h-6 text-appColor transition-colors duration-300 hover:text-[#E80F88]" />
                  <Link
                    href={item.path} // Using the path defined in categories1
                    className="text-lg font-semibold text-black cursor-pointer transition-colors duration-300 hover:text-[#E80F88]"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
