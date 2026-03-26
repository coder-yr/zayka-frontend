/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Zap, Globe, Users, Share2 } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#F8F9FB ] dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 py-20 border-b border-gray-200 dark:border-gray-800">

          {/* Brand Info Section (Left) */}
          <div className="max-w-xs flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#E80F88] shadow-sm shadow-pink-500/20 text-white p-2.5 rounded-xl flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl tracking-normal">
                ZykaPOS
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-[1.6] text-[15px] mb-8 pr-4">
              The premium operating system for modern commerce. Built for
              precision, designed for scale.
            </p>
            <div className="flex space-x-5 text-gray-700 dark:text-gray-400">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label="Website">
                <Globe strokeWidth={2.5} size={20} />
              </a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label="Community">
                <Users strokeWidth={2.5} size={20} />
              </a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label="Share">
                <Share2 strokeWidth={2.5} size={20} />
              </a>
            </div>
          </div>

          {/* Links Section (Right Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12 lg:gap-x-24 w-full lg:w-auto">
            {/* Product Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">Product</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Integrations</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">API Documentation</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">Company</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Press Kit</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Contact Sales</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">Support</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Community</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">Status Page</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright / policy bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 dark:text-gray-500 font-medium text-[14px]">
            © 2024 Ethereal Workhorse. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-6 gap-y-3 text-[14px] font-[500]">
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/security" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;